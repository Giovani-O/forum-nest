import { Injectable } from '@nestjs/common'
import { type Either, success } from '@/core/either.js'
import { CommentWithAuthor } from '../../enterprise/entities/value-objects/comment-with-author.js'
import { QuestionCommentsRepository } from '../repositories/question-comments.repository.js'

interface FetchQuestionCommentsUseCaseRequest {
  questionId: string
  page: number
}

type FetchQuestionCommentsUseCaseResponse = Either<
  null,
  {
    comments: CommentWithAuthor[]
  }
>

@Injectable()
export class FetchQuestionCommentsUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
    const comments =
      await this.questionCommentsRepository.findManyByQuestionIdWithAuthor(
        questionId,
        {
          page,
        },
      )

    return success({ comments })
  }
}
