import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Create Gym e2e", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a gym", async () => {
    const {token} = await createAndAuthenticateUser(app)

    const response = await request(app.server)
        .post("/gyms/create")
        .set('Authorization', `Bearer ${token}`)
        .send({ 
            title: 'Javascript Gym',
            description: 'Some Description',
            phone: '11999999999',
            latitude: -23.22811,
            longitude: -45.8886,
        })

    expect(response.statusCode).toEqual(201)
  });
});
