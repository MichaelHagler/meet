import puppeteer from "puppeteer";

describe("show/hide an event details", () => {
  let browser;
  let page;
  beforeAll(async () => {
    jest.setTimeout(30000);
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 100, // slow down by 250ms
      ignoreDefaultArgs: ["--disable-extensions"], // ignores default setting that causes timeout errors
    });
    page = await browser.newPage();
    await page.goto("http://localhost:3000");
    await page.waitForSelector(".event");
  });

  afterAll(() => {
    browser.close();
  });

  //end-to-end testing scenario 1 show/hide event details
  test("An event element is collapsed by default", async () => {
    const eventDetails = await page.$(".event .event__Details");

    expect(eventDetails).toBeNull();
  });

  //ETE testing scenario 2 when user clicks show details
  test("User can expand an event to see its details", async () => {
    await page.click(".event .showDetails");
    const eventDetails = await page.$(".event .event__Details");

    expect(eventDetails).toBeDefined();
  });

  //ETE testing scenario 3 user hides details
  test("User can collapse an event to hide its details", async () => {
    await page.click(".event .showDetails");
    const eventDetails = await page.$(".event .event__Details");

    expect(eventDetails).toBeNull();
  });
});
