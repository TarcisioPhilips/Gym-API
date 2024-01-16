import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetUserProfileUseCaseCaseRequest {
  userId: string;
}

interface GetUserProfileUseCaseCaseResponse {
  user: User;
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId
  }: GetUserProfileUseCaseCaseRequest): Promise<GetUserProfileUseCaseCaseResponse> {
    // buscar usuário no banco pelo email
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return {
      user,
    };
  }
}
