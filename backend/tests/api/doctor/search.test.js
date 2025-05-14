const request = require("supertest");
const { setupStrapi, cleanupStrapi } = require("../../helpers/strapi"); // Adjust path if needed

let strapi;

// @ts-ignore
beforeAll(async () => {
  strapi = await setupStrapi();
});

// @ts-ignore
afterAll(async () => {
  await cleanupStrapi();
});

// @ts-ignore
describe("GET /api/doctors/search", () => {
  // @ts-ignore
  test("should return 200 with matching doctors", async () => {
    const cityName = "Kabul";
    const specialtyName = "Dermatology";

    const response = await request(strapi.server.httpServer)
      .get("/api/doctors/search")
      .query({ city: cityName, specialty: specialtyName })
      .expect(200);

    // @ts-ignore
    expect(Array.isArray(response.body)).toBe(true);
    if (response.body.length > 0) {
      const doctor = response.body[0];
      // @ts-ignore
      expect(doctor).toHaveProperty("name");
      // @ts-ignore
      expect(doctor).toHaveProperty("city");
      // @ts-ignore
      expect(doctor.city.name).toBe(cityName);
    }
  });

  // @ts-ignore
  test("should return 404 when no doctors found", async () => {
    const response = await request(strapi.server.httpServer)
      .get("/api/doctors/search")
      .query({ city: "Nowhere", specialty: "Unknown" })
      .expect(404);

    // @ts-ignore
    expect(response.body).toHaveProperty("error");
    // @ts-ignore
    expect(response.body.error).toMatch(/No doctors found/i);
  });

  // @ts-ignore
  test("should return 400 if required query is missing", async () => {
    const response = await request(strapi.server.httpServer)
      .get("/api/doctors/search")
      .query({ city: "Kabul" }) // missing specialty
      .expect(400);

    // @ts-ignore
    expect(response.body).toHaveProperty("error");
    // @ts-ignore
    expect(response.body.error).toMatch(/city and specialty are required/i);
  });
});
