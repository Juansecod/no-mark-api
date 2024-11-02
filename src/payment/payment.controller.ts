import { Body, Controller, Get, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService){}

    @Post('')
    generateURI(@Body() body: any): any{
        const {items} = body;
        return this.paymentService.generateURI(items);;
    }
}
