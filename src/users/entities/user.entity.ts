import { BeforeInsert, Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { Church } from "src/churches/entities/church.entity";
import { Position } from "src/positions/entities/position.entity";
import { StringModifiers } from "src/common/helpers";

@Entity({name:'users'})
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type:'text', unique: true })
    email:string;

    @Column({ type:'text'})
    password:string;

    @Column({ type: 'text' })
    fullname: string;

    @Column({ type: 'text' })
    lastname: string;

    @Column({ type: 'text' })
    gender:string;

    @Column({ type: 'date'})
    birthdate: Date;  //1855-03-30

    @Column({ type: 'text', nullable: true })
    bloodType: string;

    @Column({ type:'bool', nullable:true})
    married: boolean;

    @Column({ type:'bool', default:false})
    isBaptized:boolean;

    @Column({ type: 'date', nullable:true})
    birthBaptized: Date;

    @Column({ type:'bool', default:false})
    holySpirit: boolean;

    @Column({ type: 'date', nullable:true})
    dateHolySpirit: Date;
   

    @Column({type: 'bigint'})
    tel: number;

    @Column({type: 'bool',default:true})
    isActive: boolean;

    @Column({ type: 'text'})
    nationality: string;

    @Column({type: 'text' })
    provinceOfBirth: string;

    @Column({ type: 'text' })
    cityOfBirth: string;

     
    
    @Column({type: 'text' })
    countryOfResidence: string;
    
    @Column({type: 'text' })
    provinceOfResidence: string;
    
    @Column({ type: 'text' })
    cityOfResidence: string;
    
    @Column({type: 'text', nullable:true})
    address: string;

    
    //TODO: relation with church
    @ManyToOne(
        ()=>Church,
        (church)=>church.users,
        { eager:true, cascade:true }
    )
    church: Church;

    @OneToMany(
        ()=>Position,
        (position)=> position.user,
        { eager:true, cascade:true}
    ) 
    positions:Position[];
    
    //TODO: relation with image

    @BeforeInsert()
    beforeUserInsert():void{
       this.fullname = StringModifiers.toUpperCase(this.fullname);
       this.lastname = StringModifiers.toUpperCase(this.lastname);
    }

}
