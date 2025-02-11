import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Post } from './post.entity';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { FileModule } from 'src/file/file.module';
import { FileService } from 'src/file/file.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User]), FileModule],
  controllers: [PostController],
  providers: [PostService, FileService]
})
export class PostModule {}
