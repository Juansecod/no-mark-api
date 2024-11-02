import { Module } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { ShopsController } from './shops.controller';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Module({
  imports:[FirebaseModule],
  providers: [ShopsService],
  controllers: [ShopsController]
})
export class ShopsModule {}
