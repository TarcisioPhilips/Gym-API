import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface FetchUserCheckInsUserHistoryUseCaseRequest {
  userId: string;
  page: number

}

interface FetchUserCheckInsUserHistoryUseCaseResponse {
  checkIns: CheckIn[];
}

export class FetchUserCheckInsUserHistoryUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,  ) {}

  async execute({
    userId,
    page
  }: FetchUserCheckInsUserHistoryUseCaseRequest): Promise<FetchUserCheckInsUserHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(userId,page);

    return {
      checkIns,
    }
  }
}
