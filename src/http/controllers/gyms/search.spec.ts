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

  it("should be able to search a gym by title", async () => {
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
            latitude: -23.22811,
            longitude: -45.8886,
        })

    const response = await request(app.server)
        .get('/gyms/search')
        .query({
            query: 'Javascript'
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
