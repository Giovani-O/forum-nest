import { Injectable } from '@nestjs/common'
import { type Either, failure, success } from '@/core/either.js'
import { NotAllowedError } from '@/core/errors/errors/not-allowed.error.js'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found.error.js'
import { Notification } from '../../enterprise/entities/notification.js'
import { NotificationsRepository } from '../repositories/notifications-repository.js'

interface ReadNotificationUseCaseRequest {
  recipientId: string
  notificationId: string
}

type ReadNotificationUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    notification: Notification
  }
>

@Injectable()
export class ReadNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    recipientId,
    notificationId,
  }: ReadNotificationUseCaseRequest): Promise<ReadNotificationUseCaseResponse> {
    const notification =
      await this.notificationsRepository.findById(notificationId)

    if (!notification) {
      return failure(new ResourceNotFoundError())
    }

    if (recipientId !== notification.recipientId.toString()) {
      return failure(new NotAllowedError())
    }

    notification.read()

    await this.notificationsRepository.save(notification)

    return success({ notification })
  }
}
