import { Injectable } from '@nestjs/common'
import { Either, success } from '@/core/either.js'
import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import { Answer } from '../../enterprise/entities/answer.js'
import { AnswerAttachment } from '../../enterprise/entities/answer-attachment.js'
import { AnswerAttachmentList } from '../../enterprise/entities/answer-attachment-list.js'
import { AnswersRepository } from '../repositories/answers.repository.js'

interface AnswerQuestionUseCaseRequest {
  authorId: string
  questionId: string
  attachmentIds: string[]
  content: string
}

type AnswerQuestionUseCaseResponse = Either<null, { answer: Answer }>

@Injectable()
export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    authorId,
    questionId,
    content,
    attachmentIds,
  }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(authorId),
      questionId: new UniqueEntityID(questionId),
    })

    const answerAttachments = attachmentIds.map((attachmentId) => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        answerId: answer.id,
      })
    })

    answer.attachments = new AnswerAttachmentList(answerAttachments)

    await this.answersRepository.create(answer)

    return success({
      answer,
    })
  }
}
