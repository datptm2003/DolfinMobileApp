import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
// import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

const databaseUrl =
  process.env.DATABASE_URL || 'mongodb+srv://minhnguyendoannhat:nhatminh2602@moneymanager.ojakwin.mongodb.net/?retryWrites=true&w=majority&appName=moneyManager';

@Module({
  imports: [
    MongooseModule.forRoot(databaseUrl)
    // UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
