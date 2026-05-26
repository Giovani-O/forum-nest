import { DomainEvents } from '@/core/events/domain-events.js'
import { EventHandler } from '@/core/events/event-handler.js'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers.repository.js'
import { AnswerCommentCreatedEvent } from '@/domain/forum/enterprise/events/answer-comment-created.js'
import { SendNotificationUseCase } from '../use-cases/send-notification.js'

export class OnCommentCreatedOnAnswer implements EventHandler {
  constructor(
    private answersRepository: AnswersRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewCommentOnAnswerNotification.bind(this),
      AnswerCommentCreatedEvent.name,
    )
  }

  private async sendNewCommentOnAnswerNotification({
    answerComment,
  }: AnswerCommentCreatedEvent) {
    const answer = await this.answersRepository.findById(
      answerComment.answerId.toString(),
    )

    if (answer) {
      await this.sendNotification.execute({
        recipientId: answer.authorId.toString(),
        title: 'Novo comentário em sua resposta',
        content: answerComment.content
          .substring(0, 120)
          .trimEnd()
          .concat('...'),
      })
    }
  }
}
