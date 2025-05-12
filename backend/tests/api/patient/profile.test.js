const supertest = require("supertest");
const { setupStrapi, cleanupStrapi } = require("../../helpers/strapi"); // Adjust the path if needed

// @ts-ignore
describe("Patient Profile Endpoint (/patient/me)", () => {
  let strapi;
  let token;
  // @ts-ignore
  let patient;

  // @ts-ignore
  jest.setTimeout(10000); // Increase timeout for setup and teardown

  // @ts-ignore
  beforeAll(async () => {
    strapi = await setupStrapi();

    // 1. Create test patient
    patient = await strapi.db.query("api::patient.patient").create({
      data: {
        fullname: "Test Patient",
        email: "baratalihassanzada1378@gmail.com", // Use the provided email
        phone: "1234567890",
        gender: "Male",
        password: "Barat@1378", // Use the provided password
      },
    });

    // 2. Login to get JWT token
    const loginRes = await supertest(strapi.server.httpServer)
      .post("/patients/login") // The correct login route
      .send({
        email: "baratalihassanzada1378@gmail.com", // Correct email
        password: "Barat@1378", // Correct password
      });

    console.log("Login Response:", loginRes.body); // Debug login response

    // Extract the JWT token from the login response
    token = loginRes.body.token;
    if (!token) {
      throw new Error("Token not received from login response");
    }
  });

  // @ts-ignore
  afterAll(async () => {
    await cleanupStrapi();
  });

  // @ts-ignore
  it("Should return the authenticated patient profile", async () => {
    // Make request to /patient/me with the authorization token
    const res = await supertest(strapi.server.httpServer)
      .get("/patient/me")
      .set("Authorization", `Bearer ${token}`) // Use the token for authentication
      .expect(200); // Expect 200 OK response

    // Assertions
    // @ts-ignore
    expect(res.body).toHaveProperty("fullname", "Test Patient");
    // @ts-ignore
    expect(res.body).toHaveProperty(
      "email",
      "baratalihassanzada1378@gmail.com"
    );
    // @ts-ignore
    expect(res.body).toHaveProperty("phone", "1234567890");
    // @ts-ignore
    expect(res.body).toHaveProperty("gender", "Male");
  });
});
