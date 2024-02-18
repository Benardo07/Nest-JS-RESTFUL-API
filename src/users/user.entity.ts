import { Exclude } from "class-transformer";
import { Item } from "../items/item.entity";
import { AfterInsert, AfterUpdate, AfterRemove, Column, Entity,PrimaryGeneratedColumn, OneToMany} from "typeorm";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column({default : false})
    admin : boolean;

    @OneToMany(() => Item , (item) => item.user)
    items : Item[];

    @AfterInsert()

    logInder(){
        console.log("succes insert data with id " + this.id);
    }

    @AfterRemove()

    logRemove(){
        console.log("REmoved");
    }

    @AfterUpdate()

    logUpdate(){
        console.log("Updated");
    }
}