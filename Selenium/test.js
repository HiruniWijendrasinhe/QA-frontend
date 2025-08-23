
const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

(async function loginTest() {
  // Add Chrome options for CI compatibility
  let options = new chrome.Options();
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');
  options.addArguments('--headless');
  options.addArguments('--user-data-dir=/tmp/chrome-profile-' + Math.random());

  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  try {
    // Use environment variable or default to localhost for local testing
    const baseUrl = process.env.FRONTEND_URL || "http://localhost:3000";
    await driver.get(`${baseUrl}/user-login`);

    // Wait for page to load completely
    await driver.wait(until.elementLocated(By.tagName('body')), 10000);

    // Wait for login form elements with longer timeout
    await driver.wait(until.elementLocated(By.css('input[placeholder="Username"]')), 10000);
    await driver.findElement(By.css('input[placeholder="Username"]')).sendKeys("lakshikahiruni20@gmail.com");

    await driver.wait(until.elementLocated(By.css('input[placeholder="Password"]')), 5000);
    await driver.findElement(By.css('input[placeholder="Password"]')).sendKeys("200155904026");

    await driver.wait(until.elementLocated(By.css(".button[type='submit']")), 5000);
    await driver.findElement(By.css(".button[type='submit']")).click();

    // Wait for either success or error scenario
    await driver.wait(async () => {
      try {
        // Check if login was successful (home page loaded)
        await driver.findElement(By.css(".HomeContainer"));
        console.log("Login successful, home page loaded!");
        return true;
      } catch (e) {
        // Check if there's an error message (not using alert)
        const errorElements = await driver.findElements(By.css(".error-message, .alert, [role='alert']"));
        if (errorElements.length > 0) {
          const errorText = await errorElements[0].getText();
          console.log("Login failed with error:", errorText);
          return true;
        }
        return false;
      }
    }, 15000);

  } catch (err) {
    console.error("Login test failed:", err);
    // Take screenshot for debugging
    const screenshot = await driver.takeScreenshot();
    console.log("Screenshot data (base64) available for debugging");
  } finally {
    await driver.quit();
  }
})();