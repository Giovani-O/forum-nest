import { Injectable } from '@nestjs/common'
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comment-repository'
import { PaginationParams } from '@/domain/forum/application/repositories/pagination-parameters'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

@Injectable()
export class PrismaAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  findById(id: string): Promise<AnswerComment | null> {
    throw new Error('Method not implemented.')
  }
  findManyByAnswerId(
    answerId: string,
    params: PaginationParams,
  ): Promise<AnswerComment[]> {
    throw new Error('Method not implemented.')
  }
  create(answerComment: AnswerComment): Promise<void> {
    throw new Error('Method not implemented.')
  }
  delete(answerComment: AnswerComment): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
