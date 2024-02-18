import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dtos/create-item.dto';
import { User } from 'src/users/user.entity';
import { QueryItemDto } from './dtos/query-item.dto';

@Injectable()
export class ItemsService {

    constructor(
        @InjectRepository(Item) private itemRepository : Repository<Item>,
    ){}

    create(item : CreateItemDto , user: User){
        const newItem = this.itemRepository.create(item);
        newItem.user = user;
        return this.itemRepository.save(newItem);
    }

    async getAllItems(query : QueryItemDto){
        const q = await this.itemRepository.createQueryBuilder().select('*').where('approved = :approved',{approved : true})
        
        if(query.name){
            q.andWhere('name LIKE :name',{name : `%${query.name}`});
        }
        if(query.location){
            q.andWhere('location LIKE :location',{location : `%${query.location}`});
        }

        if(query.category){
            q.andWhere('category LIKE :category',{category : `%${query.category}`});
        }
        
        
        


        return q.getRawMany();
    }
    async approveItem(id : number, approve: boolean){
        const item = await this.itemRepository.findOneBy({id});

        if(!item){
            throw new NotFoundException('Item Not found');
        }

        item.approved = approve;

        return this.itemRepository.save(item);

    }
}
