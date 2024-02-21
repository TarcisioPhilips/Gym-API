import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Search Gyms e2e", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to list nearby gym", async () => {
    const {token} = await createAndAuthenticateUser(app)

    await request(app.server)
        .post("/gyms/create")
        .set('Authorization', `Bearer ${token}`)
        .send({ 
            title: 'Javascript Gym',
            description: 'Some Description',
            phone: '11999999999',
            latitude: -23.22811,
            longitude: -45.8886,
        })

    await request(app.server)
        .post("/gyms/create")
        .set('Authorization', `Bearer ${token}`)
        .send({ 
            title: 'Typescript Gym',
            description: 'Some Description',
            phone: '11999999999',
            latitude: -13.22811,
            longitude: -55.8886,
        })

    const response = await request(app.server)
        .get('/gyms/nearby')
        .query({
            latitude: -23.22811,
            longitude: -45.8886,
        })
        .set('Authorization', `Bearer ${token}`)
        .send()


    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
        expect.objectContaining({
            title:'Javascript Gym'
        })
    ])

  });
});
