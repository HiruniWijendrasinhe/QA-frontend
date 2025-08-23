const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

(async function addQuestionTest() {
  // Chrome options for CI - REMOVE user-data-dir or make it unique
  let options = new chrome.Options();
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');
  options.addArguments('--disable-gpu');
  options.addArguments('--headless=new');
  options.addArguments('--incognito'); //  Use incognito instead of user-data-dir

  // If you MUST use user-data-dir, make it unique:
  // options.addArguments('--user-data-dir=/tmp/chrome-profile-test2-' + Date.now());

  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  try {
    // Set longer timeouts
    await driver.manage().setTimeouts({
      implicit: 30000,
      pageLoad: 30000
    });

    // Your test logic here...
    const baseUrl = process.env.FRONTEND_URL || "http://localhost:3000";
    await driver.get(`${baseUrl}/some-page`);

    // ... rest of your test code

  } catch (err) {
    console.error("Add question test failed:", err.message);
    const screenshot = await driver.takeScreenshot();
    console.log("Screenshot data available for debugging");
  } finally {
    await driver.quit();
  }
})();