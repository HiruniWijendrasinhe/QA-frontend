
const { Builder, By, until } = require("selenium-webdriver");
require("chromedriver");

(async function loginTest() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("http://localhost:3000/user-login");

    await driver.wait(until.elementLocated(By.css(".modal")), 5000);

    await driver.findElement(By.css('input[placeholder="Username"]')).sendKeys("lakshikahiruni20@gmail.com");
    await driver.findElement(By.css('input[placeholder="Password"]')).sendKeys("200155904026");
    await driver.findElement(By.css(".button[type='submit']")).click();

    // Wait a bit for alert
    await driver.sleep(1000);

    // Switch to alert and accept it
    try {
      let alert = await driver.switchTo().alert();
      console.log("Handled login failure alert successfully");
      await alert.accept();
    } catch (e) {
      console.log("No alert present, continuing...");
    }
     await driver.wait(until.elementLocated(By.css(".HomeContainer")), 5000);
        console.log("Login successful, home page loaded!");

  } catch (err) {
    console.error("Login test failed:", err);
  } finally {
    await driver.quit();
  }
})();
