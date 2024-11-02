import { Body, Controller, NotFoundException, Param } from '@nestjs/common';
import { Get, Post } from '@nestjs/common';
import { DesignsService } from './designs.service';

@Controller('designs')
export class DesignsController {
    constructor(private designsService: DesignsService){}

    @Get()
    async getDesigns(): Promise<Array<any>> {
        try {
            const designs = await this.designsService.getDesigns();
            return designs;
        } catch (error) {
            console.log(error);
        }
    }

    @Get(":id")
    async getDesignById(@Param('id') id: string) {
        const design = await this.designsService.getDesignById(id);
        if(!design) throw new NotFoundException();
        return design;
    }

    @Post('create')
    async createDesign(@Body() designData: any): Promise<any>{
        try {
            const design = await this.designsService.addDesign(designData);
            return design;
        } catch (error) {
            console.log(error);
        }
    }
}
