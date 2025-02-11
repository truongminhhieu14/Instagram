import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './common/database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { FileModule } from './file/file.module';
import { PostModule } from './post/post.module';
import { LikePostModule } from './like-post/like-post.module';
import { LikeCommentController } from './like-comment/like-comment.controller';
import { LikeCommentModule } from './like-comment/like-comment.module';
import { CommentController } from './comment/comment.controller';
import { CommentModule } from './comment/comment.module';
import { FeedModule } from './feed/feed.module';
import { EventsModule } from './events/events.module';
import LogsMiddleware from './middleware/logger.middleware';

@Module({
  imports: [
    AuthModule,
    UserModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secretOrPrivateKey: configService.get('JWT_SECRET'),
        global: true
      }),
      inject: [ConfigService]
    }),
    FileModule,
    PostModule,
    LikePostModule,
    LikeCommentModule,
    CommentModule,
    FeedModule,
    EventsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LogsMiddleware)
      .forRoutes('*');
  }
}
