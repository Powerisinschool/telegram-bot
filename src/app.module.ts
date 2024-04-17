import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseModule } from './firebase/firebase.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Stream } from './entities/stream.entity';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { TestModule } from './tester/test.module';
import { File } from './entities/file.entity';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      cache: true,
    }),
    FirebaseModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGO_URI,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      database: 'zippity',
      retryAttempts: 4,
      synchronize: true,
      logging: true,
      entities: [User, Stream, File],
    }),
    UserModule,
    TestModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
