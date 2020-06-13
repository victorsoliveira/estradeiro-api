import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "stop_points" })
export class StopPoint {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    lat: number;

    @Column()
    long: number;

    @Column()
    road?: string;

    @Column({
        type: 'boolean',
        nullable: false,
    })
    fuel_supply?: boolean;

    @Column({
        type: 'boolean',
        nullable: false,
    })
    restaurant?: boolean;

    @Column({
        type: 'boolean',
        nullable: false,
    })
    snack_bar?: boolean;

    @Column({
        type: 'boolean',
        nullable: false,
    })
    convenience_store?: boolean;

    @Column({
        type: 'boolean',
        nullable: false,
    })
    public_phone?: boolean;

    @Column({
        type: 'boolean',
        nullable: false,
    })
    hotel?: boolean;

    @Column({
        type: 'boolean',
        nullable: false,
    })
    mechanics?: boolean;

    @Column({
        type: 'boolean',
        nullable: false,
    })
    borrower?: boolean;

    @Column({
        type: 'boolean',
        nullable: false,
    })
    money_supply?: boolean;

    @Column()
    site_size_m2?: number;

    @Column()
    vacancy_length?: number;
}
