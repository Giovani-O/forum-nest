import { Module } from '@nestjs/common'
import { QuestionsRepository } from '@/domain/forum/application/repositories/question.repository'
import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository'
import { PrismaService } from './prisma/prisma.service'
import { PrismaAnswerAttachmentsRepository } from './prisma/repositories/prisma-answer-attachments-repository'
import { PrismaAnswerCommentsRepository } from './prisma/repositories/prisma-answer-coments-repository'
import { PrismaAnswersRepository } from './prisma/repositories/prisma-answers-repository'
import { PrismaQuestionAttachmentsRepository } from './prisma/repositories/prisma-question-attachments-repository'
import { PrismaQuestionCommentsRepository } from './prisma/repositories/prisma-question-comments-repository'
import { PrismaQuestionRepository } from './prisma/repositories/prisma-question-repository'
import { PrismaStudentsRepository } from './prisma/repositories/prisma-students-repository'

@Module({
  providers: [
    { provide: QuestionsRepository, useClass: PrismaQuestionRepository },
    { provide: StudentsRepository, useClass: PrismaStudentsRepository },
    PrismaService,
    PrismaAnswersRepository,
    PrismaAnswerCommentsRepository,
    PrismaAnswerAttachmentsRepository,
    PrismaQuestionCommentsRepository,
    PrismaQuestionAttachmentsRepository,
  ],
  exports: [
    PrismaService,
    PrismaAnswersRepository,
    PrismaAnswerCommentsRepository,
    PrismaAnswerAttachmentsRepository,
    PrismaQuestionCommentsRepository,
    PrismaQuestionAttachmentsRepository,
    QuestionsRepository,
    StudentsRepository,
  ],
})
export class DatabaseModule {}
