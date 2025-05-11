// @ts-ignore
const { setupStrapi, cleanupStrapi } = require("../../helpers/strapi");
const request = require("supertest");

let strapiInstance;

// @ts-ignore
describe("GET localhost:1337/api/about", () => {
  const testAboutData = {
    title: "About Our Medical Clinic",
    seoTitle: "Healthcare Services - About Us",
    content: "<p>Quality care since 2020</p>",
  };

  // @ts-ignore
  beforeAll(async () => {
    // Create test data before all tests
    // @ts-ignore
    await strapiInstance.entityService.update("api::about.about", 1, {
      data: testAboutData,
    });
  }, 10000);

  // @ts-ignore
  afterAll(async () => {
    await cleanupStrapi();
  }, 10000);

  // @ts-ignore
  it("should return about content with 200 status", async () => {
    // @ts-ignore
    await request(strapiInstance.server.httpServer)
      .get("/api/about")
      .expect(200)
      .then((response) => {
        // @ts-ignore
        expect(response.body.data).toBeDefined();
        // @ts-ignore
        expect(response.body.data.attributes.title).toBe(testAboutData.title);
        // @ts-ignore
        expect(response.body.data.attributes.content).toBe(
          testAboutData.content
        );
      });
  });

  // @ts-ignore
  it("should return proper content-type header", async () => {
    // @ts-ignore
    await request(strapiInstance.server.httpServer)
      .get("/api/about")
      .expect("Content-Type", /application\/json/);
  });
});
