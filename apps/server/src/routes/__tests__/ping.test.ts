import request from "supertest";

import app from "../../app";

describe("ping", () => {
  it("should ping the server", async () => {
    const response = await request(app).get("/v1/ping");

    expect(response.statusCode).toBe(200);
  });
});
