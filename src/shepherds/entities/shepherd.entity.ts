import { Church } from "src/churches/entities/church.entity";
import { Directive } from "src/directives/entities/directive.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Shepherd {


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

    @Column({ type: 'bigint' })
    tel:number;

    @Column({ type: 'date'})
    birthdate: Date;

    @Column({ type:'bool', default:false})
    married: boolean;

    @Column({ type: 'date', nullable:true})
    birthBaptized: Date;

    @Column({ type: 'date', nullable:true})
    dateHolySpirit: Date;
    
    
    @Column({type: 'date', nullable: true})
    ordinationDate: Date;

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

    

    @OneToOne(
        ()=>Church,
        (church)=> church.shepherd,
        {eager:true}
    )
    church:Church;

   @OneToOne(
    ()=>Directive,
    (directive)=> directive.shepherd,
    {eager:true,cascade:true}
   )
   directive:Directive;
    

    //TODO: LICENCE entity and relation
    //@Column({ type: 'text', default:''})
    //licence: string;  //ordenacion, general, local

    //TODO: Relation fellowshipCard
}
