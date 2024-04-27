import { Church } from "src/churches/entities/church.entity";
import { Shepherd } from "src/shepherds/entities/shepherd.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'positions'})
export class Position {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({type: 'text',})
    name: string;

    @Column({type: 'date', nullable:true })
    from: Date;

    @Column({type: 'date', nullable:true })
    to: Date;

    @ManyToOne(
        ()=>User,
        (user)=>user.positions,
    )
    user:User;

    @ManyToOne(
        ()=>Church,
        (church)=>church.positions
    )
    church: Church;

    //Relacion: is required when type is local
    //church: string;

    //TODO: definir de forma programatica

}
