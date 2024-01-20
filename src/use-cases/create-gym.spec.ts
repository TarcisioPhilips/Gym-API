import { expect, describe, it, beforeEach } from "vitest";
import { CreateGymUseCase } from "./create-gym";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe("Create Gym User Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymsRepository);

    await gymsRepository.create({
        title: "Javascript Gym",
        description: "",
        phone: "",
        latitude: -23.22811,
        longitude: -45.8886,
      });
  });

  it("should be able to create gym", async () => {
    const { gym } = await sut.execute({
      title: "Javascript Gym",
      description: "",
      phone: "",
      latitude: -23.22811,
      longitude: -45.8886,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
