import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MercadoPagoConfig } from 'mercadopago';
import { Config } from 'mercadopago/dist/types';

const paymentProvider = {
  provide: 'MERCADOPAGO_CLIENT',
  inject: [ConfigService],
  useFactory: (configService: ConfigService): MercadoPagoConfig => {
    const config: Config = {
        'accessToken': configService.get<string>('ACCESS_TOKEN_MERCADOPAGO'),
    };

    return new MercadoPagoConfig(config);
  },
};

@Module({
  imports: [ConfigModule],
  controllers: [PaymentController],
  providers: [paymentProvider, PaymentService]
})
export class PaymentModule {}
