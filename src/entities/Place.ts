import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "places" })
export class Place {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    lat: number;

    @Column()
    long: number;

    @Column()
    category: string;

    @Column()
    name: string;

    @Column()
    always_open: string;

    @Column()
    period_info: string;

    @Column()
    open_time: string;

    @Column()
    close_time: string;

    @Column()
    phone: string;

    @Column()
    details: string;
}
