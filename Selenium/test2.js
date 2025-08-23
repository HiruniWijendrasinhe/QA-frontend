const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

const options = new chrome.Options();
options.addArguments("--start-maximized");
options.addArguments("--disable-dev-shm-usage");
options.addArguments("--no-sandbox");
options.addArguments("--disable-extensions");
options.addArguments("--remote-debugging-port=9222");


async function addProfileTest() {
    const driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(options)
        .build();

    try {
        // Maximize window to ensure it's visible
        await driver.manage().window().maximize();

        console.log("Opening add-profile page...");
        await driver.get("http://localhost:3000/add-profile");
        await driver.sleep(1000);

        console.log("Filling name...");
        await driver.findElement(By.css('input[placeholder="Name"]')).sendKeys("Amara");
        console.log("Filling age...");
        await driver.findElement(By.css('input[placeholder="Age"]')).sendKeys("25");
        console.log("Filling address...");
        await driver.findElement(By.css('textarea[placeholder="Address"]')).sendKeys("123 Main Street");
        console.log("Filling phone...");
        await driver.findElement(By.css('input[placeholder="PhoneNo"]')).sendKeys("0771234567");

        const img = await driver.findElement(By.id("IMG1"));
        const src = await img.getAttribute("src");
        console.log(src.includes("DefauProfile.png") ? "Default profile image is shown" : "Profile image uploaded by user is shown");

        console.log("Submitting form...");
        await driver.findElement(By.css('button[type="submit"]')).click();

        console.log("Waiting for navigation...");
        await driver.wait(until.urlIs("http://localhost:3000/"), 5000);
        console.log("Profile added successfully! Reached homepage.");

    } catch (err) {
        console.error("Test failed:", err);
    } finally {
        console.log("Test completed. Browser will close in 10 seconds...");
        await driver.sleep(10000); // Wait 10 seconds before closing
        await driver.quit();
        console.log("Browser closed.");
    }
}

addProfileTest();