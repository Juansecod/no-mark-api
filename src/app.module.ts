import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentModule } from './payment/payment.module';
import { FirebaseModule } from './firebase/firebase.module';
import { DesignsModule } from './designs/designs.module';
import { ShopsModule } from './shops/shops.module';

@Module({
  imports: [ConfigModule.forRoot({ cache: true }), PaymentModule, FirebaseModule, DesignsModule, ShopsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
