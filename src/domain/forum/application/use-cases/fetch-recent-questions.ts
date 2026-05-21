import { Injectable } from '@nestjs/common'
import { type Either, success } from '@/core/either.js'
import type { Question } from '../../enterprise/entities/question.js'
import type { QuestionsRepository } from '../repositories/question.repository.js'

interface FetchRecentQuestionsUseCaseRequest {
  page: number
}

type FetchRecentQuestionsUseCaseResponse = Either<
  null,
  {
    questions: Question[]
  }
>

@Injectable()
export class FetchRecentQuestionsUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    page,
  }: FetchRecentQuestionsUseCaseRequest): Promise<FetchRecentQuestionsUseCaseResponse> {
    const questions = await this.questionsRepository.findManyRecent({ page })

    return success({ questions })
  }
}
