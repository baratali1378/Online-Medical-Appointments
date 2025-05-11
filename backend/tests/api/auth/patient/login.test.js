const request = require("supertest");
// @ts-ignore
const bcrypt = require("bcryptjs");
const { setupStrapi, cleanupStrapi } = require("../../../helpers/strapi");

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
describe("Patient Login", () => {
  const email = "testuser@example.com";
  const plainPassword = "MySecret123!";

  // @ts-ignore
  beforeAll(async () => {
    // Clean up existing test user (in case of leftover from failed run)
    const existing = await strapi.db
      .query("api::patient.patient")
      .findOne({ where: { email } });

    if (existing) {
      await strapi.db
        .query("api::patient.patient")
        .delete({ where: { id: existing.id } });
    }

    // Create test patient
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    await strapi.db.query("api::patient.patient").create({
      data: {
        email,
        password: hashedPassword,
        fullname: "Test User",
        phone: "1234567890",
        image: null,
        publishedAt: new Date(),
      },
    });
  });

  // @ts-ignore
  afterAll(async () => {
    // Cleanup test patient after all tests
    const existing = await strapi.db
      .query("api::patient.patient")
      .findOne({ where: { email } });

    if (existing) {
      await strapi.db
        .query("api::patient.patient")
        .delete({ where: { id: existing.id } });
    }
  });

  // @ts-ignore
  it("logs in successfully with correct credentials", async () => {
    const res = await request(strapi.server.httpServer)
      .post("/api/patients/login")
      .send({
        email,
        password: plainPassword,
      });

    // @ts-ignore
    expect(res.statusCode).toBe(200);
    // @ts-ignore
    expect(res.body).toHaveProperty("token");
    // @ts-ignore
    expect(res.body.patient.email).toBe(email);
  });

  // @ts-ignore
  it("fails to login with wrong password", async () => {
    const res = await request(strapi.server.httpServer)
      .post("/api/patients/login")
      .send({
        email,
        password: "wrongpassword",
      });

    // @ts-ignore
    expect(res.statusCode).toBe(401);
    // @ts-ignore
    expect(res.body.error.message).toBe("Invalid email or password");
  });

  // @ts-ignore
  it("fails to login with missing fields", async () => {
    const res = await request(strapi.server.httpServer)
      .post("/api/patients/login")
      .send({});

    // @ts-ignore
    expect(res.statusCode).toBe(400);
    // @ts-ignore
    expect(res.body.error.message).toBe("Email and password are required.");
  });
});
