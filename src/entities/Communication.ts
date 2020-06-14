import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "communication" })
export class Communication {

    constructor(contact: string, message: string, identifier: string) {
      this.contact = contact;
      this.message = message;
      this.processed = false;
      this.identifier = identifier;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    contact: string;

    @Column()
    message: string;

    @Column()
    processed: boolean;

    @Column()
    identifier: string;
}