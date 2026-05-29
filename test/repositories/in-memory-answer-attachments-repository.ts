import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository.js'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment.js'

export class InMemoryAnswerAttachmentsRepository
  implements AnswerAttachmentsRepository
{
  public items: AnswerAttachment[] = []

  async createMany(attachments: AnswerAttachment[]): Promise<void> {
    this.items.push(...attachments)
  }

  async deleteMany(attachments: AnswerAttachment[]): Promise<void> {
    const answerAttachments = this.items.filter((item) => {
      return !attachments.some((attachment) => attachment.equals(item))
    })

    this.items = answerAttachments
  }

  async findManyByAnswerId(questionId: string) {
    const answerAttachments = this.items.filter(
      (item) => item.answerId.toString() === questionId,
    )

    return answerAttachments
  }

  async deleteManyByAnswerId(questionId: string) {
    const answerAttachments = this.items.filter(
      (item) => item.answerId.toString() !== questionId,
    )

    this.items = answerAttachments
  }
}
