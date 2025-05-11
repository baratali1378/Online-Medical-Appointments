const request = require("supertest");
const { setupStrapi, cleanupStrapi } = require("../../helpers/strapi");

let strapiInstance;

// @ts-ignore
beforeAll(async () => {
  strapiInstance = await setupStrapi(); // ✅ You missed this assignment!
}, 10000);

// @ts-ignore
afterAll(async () => {
  await cleanupStrapi();
}, 10000);

// @ts-ignore
describe("GET /api/about", () => {
  // @ts-ignore
  it("should return about content with 200 status", async () => {
    const res = await request(strapiInstance.server.httpServer)
      .get("/api/about?populate=*")
      .expect(200);

    // @ts-ignore
    expect(res.body.data).toBeDefined();
    // @ts-ignore
    expect(res.body.data.attributes.title).toBeDefined();
  });

  // @ts-ignore
  it("should return proper content-type header", async () => {
    const res = await request(strapiInstance.server.httpServer)
      .get("/api/about?populate=*")
      .expect(200);

    // @ts-ignore
    expect(res.headers["content-type"]).toMatch(/application\/json/);
  });
});
