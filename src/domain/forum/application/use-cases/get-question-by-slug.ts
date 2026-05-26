import { Injectable } from '@nestjs/common'
import { type Either, failure, success } from '@/core/either.js'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found.error.js'
import { Question } from '../../enterprise/entities/question.js'
import { QuestionsRepository } from '../repositories/question.repository.js'

interface GetQuestionBySlugUseCaseRequest {
  slug: string
}

type GetQuestionBySlugUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    question: Question
  }
>

@Injectable()
export class GetQuestionBySlugUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    slug,
  }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
    const question = await this.questionsRepository.findBySlug(slug)

    if (!question) {
      return failure(new ResourceNotFoundError())
    }

    return success({ question })
  }
}
