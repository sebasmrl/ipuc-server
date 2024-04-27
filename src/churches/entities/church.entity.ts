import { Position } from "src/positions/entities/position.entity";
import { Shepherd } from "src/shepherds/entities/shepherd.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Church {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({type: 'text'})
    campusName: string;

    @Column({type: 'text'})
    country: string;

    @Column({type: 'text'})
    province:string;

    @Column({type: 'text'})
    city:string;

    @Column({type: 'text'})
    address: string;

    @OneToOne(
        ()=>Shepherd,
        (shepherd)=> shepherd.church
    )
    @JoinColumn()
    shepherd:Shepherd;

    @OneToMany(
        ()=>User,
        (user)=>user.church
    )
    users: User[];


    @OneToMany(
        ()=>Position,
        (position)=>position.church
    )
    positions: Position[];

}
