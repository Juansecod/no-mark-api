import { Module } from '@nestjs/common';
import { DesignsController } from './designs.controller';
import { DesignsService } from './designs.service';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Module({
  imports:[FirebaseModule],
  controllers: [DesignsController],
  providers: [DesignsService]
})
export class DesignsModule {}
