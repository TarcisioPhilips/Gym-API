import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { FetchNearbyGymsUseCase } from "./featch-nearby-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;

describe("Fetch Nearby Gym Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsUseCase(gymsRepository);
  });

  it("should be able to fetch nearby gyms", async () => {
    await gymsRepository.create({
        title: 'Near Gym',
        description: "",
        phone: "",
        latitude: -23.22811,
        longitude: -45.8886,
    })

    await gymsRepository.create({
        title: 'Far Gym',
        description: "",
        phone: "",
        latitude: -13.22811,
        longitude: -55.8886,
    })

    const { gyms } = await sut.execute({
        userLatitude: -23.228119939219653,
        userLongitude: -45.88862731382569,
    });

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
        expect.objectContaining({title:'Near Gym'}),
    ])
  });
  
});
