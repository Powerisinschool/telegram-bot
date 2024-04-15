import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestController } from './test.controller';
import { User } from 'src/entities/user.entity';
import { TestService } from './test.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
    ],
    controllers: [TestController],
    providers: [TestService],
    exports: [TypeOrmModule],
})
export class TestModule {}
