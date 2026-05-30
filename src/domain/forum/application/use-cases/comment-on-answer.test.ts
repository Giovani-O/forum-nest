import { makeAnswer } from '@test/factories/make-answer.js'
import { InMemoryAnswerAttachmentsRepository } from '@test/repositories/in-memory-answer-attachments-repository.js'
import { InMemoryAnswerCommentsRepository } from '@test/repositories/in-memory-answer-comments-repository.js'
import { InMemoryAnswersRepository } from '@test/repositories/in-memory-answers-repository.js'
import { InMemoryStudentsRepository } from '@test/repositories/in-memory-students-repository.js'
import { beforeEach, describe, expect, it } from 'vitest'
import { CommentOnAnswerUseCase } from './comment-on-answer.js'

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryStudentsRepository: InMemoryStudentsRepository
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: CommentOnAnswerUseCase

describe('Comment on Answer', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository(
      inMemoryStudentsRepository,
    )

    sut = new CommentOnAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerCommentsRepository,
    )
  })

  it('should be able to comment on answer', async () => {
    const answer = makeAnswer()

    await inMemoryAnswersRepository.create(answer)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
      content: 'Comentário teste',
    })

    expect(inMemoryAnswerCommentsRepository.items[0]?.content).toEqual(
      'Comentário teste',
    )
  })
})
