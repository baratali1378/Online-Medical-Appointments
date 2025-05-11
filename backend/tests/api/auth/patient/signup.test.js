const request = require("supertest");
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

const TEST_EMAIL = "signuptest@example.com";
const TEST_PHONE = "1112223333";

const deleteTestUser = async () => {
  const existing = await strapi.db.query("api::patient.patient").findOne({
    where: { email: TEST_EMAIL },
  });
  if (existing) {
    await strapi.db.query("api::patient.patient").delete({
      where: { id: existing.id },
    });
  }
};

// @ts-ignore
afterEach(async () => {
  await deleteTestUser();
});

// @ts-ignore
describe("Patient Signup", () => {
  // @ts-ignore
  it("successfully signs up a new patient", async () => {
    const res = await request(strapi.server.httpServer)
      .post("/api/patients/signup")
      .send({
        data: {
          fullname: "Signup Test",
          email: TEST_EMAIL,
          phone: TEST_PHONE,
          password: "SignupPass123!",
          gender: "male",
          birth: "2000-01-01",
        },
      });

    // @ts-ignore
    expect(res.statusCode).toBe(200);
    // @ts-ignore
    expect(res.body).toHaveProperty("token");
    // @ts-ignore
    expect(res.body.patient.email).toBe(TEST_EMAIL);
    // @ts-ignore
    expect(res.body.patient).not.toHaveProperty("password");
  });

  // @ts-ignore
  it("fails if required fields are missing", async () => {
    const res = await request(strapi.server.httpServer)
      .post("/api/patients/signup")
      .send({
        data: {
          email: TEST_EMAIL,
          password: "12345678",
        },
      });

    // @ts-ignore
    expect(res.statusCode).toBe(400);
    // @ts-ignore
    expect(res.body.error.message).toMatch(
      /Please provide all required fields/i
    );
  });

  // @ts-ignore
  it("fails if email or phone already exists", async () => {
    // Create user manually
    await strapi.db.query("api::patient.patient").create({
      data: {
        fullname: "Existing User",
        email: TEST_EMAIL,
        phone: TEST_PHONE,
        gender: "male",
        birth: "1990-01-01",
        password: "irrelevant", // manually created; password isn't checked in this test
        publishedAt: new Date(),
      },
    });

    const res = await request(strapi.server.httpServer)
      .post("/api/patients/signup")
      .send({
        data: {
          fullname: "Duplicate Test",
          email: TEST_EMAIL,
          phone: TEST_PHONE,
          password: "AnotherPass123!",
          gender: "female",
          birth: "1995-05-05",
        },
      });

    // @ts-ignore
    expect(res.statusCode).toBe(400);
    // @ts-ignore
    expect(res.body.error.message).toMatch(/already exists/i);
  });
});
