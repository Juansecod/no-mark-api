import { Controller, Get, Post, Body, Param, BadRequestException, NotFoundException, Patch, Query, Redirect } from '@nestjs/common';
import { ShopsService } from './shops.service';

@Controller('shops')
export class ShopsController {
    constructor(private readonly shopsService: ShopsService) {}
    
    @Get()
    async getShops(@Body() body: any) {
        const { userEmail } = body;
        if(!userEmail) throw new NotFoundException();
        const shops = await this.shopsService.getShopsByUserEmail(userEmail);
        return shops;
    }
    
    @Get('paymentResponse')
    @Redirect('nomarkapp://payment/failure', 302)
    async paymentResposne(@Query('status') status: string, @Query('preference_id') preferenceId: string): Promise<any>{
        if(status == 'approved') status = 'APROBADO';
        if(status == 'rejected') status = 'RECHAZADO';

        const res = await this.shopsService.updateStatusByPreferenceId(preferenceId, status);
        if(status === 'APROBADO'){
            return {url: 'nomarkapp://payment/success'}
        }
    }

    @Get(":id")
    async getShopById(@Param('id') id: string) {
        const shop = await this.shopsService.getShopById(id);
        if(!shop) throw new NotFoundException();
        return shop;
    }

    @Get(":idPreference")
    async getShopByIdPreference(@Param('idPreference') id: string) {
        const shop = await this.shopsService.getShopByIdPreference(id);
        if(!shop) throw new NotFoundException();
        return shop;
    }

    @Post('create')
    async createShop(@Body() shop: any): Promise<string> {
        try {
            const id = await this.shopsService.addShop(shop);
            return id;
        } catch (error) {
            throw new BadRequestException();
        }
    }

    @Patch(':id/update')
    async updateShop(@Param('id') id: string, @Query('status') status: any): Promise<any> {
        const shopId = await this.shopsService.updateStatus(id, status);
        if(!shopId) throw new NotFoundException();
        return {
            'msg': 'ok'
        };
    }
}
