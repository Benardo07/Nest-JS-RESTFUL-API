import { Body, Controller, Param, Patch, Post, UseGuards ,Get, Query} from '@nestjs/common';
import { CreateItemDto } from './dtos/create-item.dto';
import { ItemsService } from './items.service';
import { AuthGuard } from '../guards/auth.guards';
import { CurrentUser } from '../auth/decorators/curent-user.decorators';
import { User } from 'src/users/user.entity';
import { serialize } from '../interceptors/serialize.interceptors';
import { ItemDto } from './dtos/item.dto';
import { Item } from './item.entity';
import { ApproveItemDto } from './dtos/approve-item.dto';
import { AdminGuard } from '../guards/admin.guards';
import { QueryItemDto } from './dtos/query-item.dto';

@Controller('items')
export class ItemsController {

    constructor(private itemService : ItemsService){}

    @Get()
    getAllItems(@Query() query : QueryItemDto){
        console.log(query);
        return this.itemService.getAllItems(query);
    }

    @Post()
    @UseGuards(AuthGuard)
    @serialize(ItemDto)
    createItem(@Body() body : CreateItemDto , @CurrentUser() user : User){
        return this.itemService.create(body, user)
    }

    @Patch('/:id')
    @UseGuards(AdminGuard)
    approvedItem (@Param('id') id : string, @Body() body : ApproveItemDto) {
        return this.itemService.approveItem(parseInt(id),body.approved);
    }
}
