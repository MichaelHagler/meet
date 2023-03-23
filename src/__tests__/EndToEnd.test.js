import puppeteer from "puppeteer";

describe("show/hide an event details", () => {
  let browser;
  let page;
  beforeAll(async () => {
    jest.setTimeout(30000);
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto("http://localhost:3000");
    await page.waitForSelector(".event-details");
  });

  afterAll(() => {
    browser.close();
  })

  //end-to-end testing scenario 1 show/hide event details
  test("An event element is collapsed by default", async () => {
    const eventDetails = await page.$(".event-details .event-details__Details");

    expect(eventDetails).toBeNull();
  });

  //ETE testing scenario 2 when user clicks show details
  test("User can expand an event to see its details", async () => {
    await page.click(".event-details .show-details");
    const eventDetails = await page.$(".event-details .event-details__Details");

    expect(eventDetails).toBeDefined();
  });

  //ETE testing scenario 3 user hides details
  test("User can collapse an event to hide its details", async () => {
    await page.click(".event-details .show-details");
    const eventDetails = await page.$(".event-details .event-details__Details");

    expect(eventDetails).toBeNull();
  });
});