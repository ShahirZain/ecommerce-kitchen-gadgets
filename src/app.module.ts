import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './features/feature.module';
@Module({
  imports: [ChatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
