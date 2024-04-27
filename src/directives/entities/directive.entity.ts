import { Shepherd } from "src/shepherds/entities/shepherd.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'directives'})
export class Directive {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({type: 'text', default:'distrital'})
    type: string; //nacional, distrital, local

    @Column({type: 'text'})
    name:string;

    @Column({type: 'date', nullable:true })
    from: Date;

    @Column({type: 'date', nullable:true })
    to: Date;

    @OneToOne(
        ()=>Shepherd,
        (shepherd)=>shepherd.directive
    )
    @JoinColumn()
    shepherd:Shepherd;


    //TODO: definir de forma programatica

}

