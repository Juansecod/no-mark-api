import { Inject, Injectable } from '@nestjs/common';
import { MercadoPagoConfig, Preference, } from 'mercadopago';

@Injectable()
export class PaymentService {
    private preference: Preference;

    constructor(@Inject('MERCADOPAGO_CLIENT') private client: MercadoPagoConfig){
        this.preference = new Preference(this.client);
    }

    async generateURI(items: any): Promise<any>{
        const body: any = {
            payment_methods: {
                excluded_payment_methods: [],
                excluded_payment_types: [
                    {
                        id: "ticket"
                    }
                ],
                installments: 1
            },
            /* items: [
                {
                  title: 'Mi producto',
                  quantity: 1,
                  unit_price: 20000,
                  currency_id: 'COP'
                }
              ], */
            items,
            back_urls: {
                success: 'https://3000-idx-api-rest-no-mark-1729718476949.cluster-fnjdffmttjhy2qqdugh3yehhs2.cloudworkstations.dev/shops/paymentResponse',
                failure: 'https://3000-idx-api-rest-no-mark-1729718476949.cluster-fnjdffmttjhy2qqdugh3yehhs2.cloudworkstations.dev/shops/paymentResponse',
            },
            auto_return: "approved"
        }
        try{
            const result = await this.preference.create({body});
            return {
                url: result.sandbox_init_point,
                id: result.id
            }
        }catch(error){
            console.log(error);
        }
    }
}
