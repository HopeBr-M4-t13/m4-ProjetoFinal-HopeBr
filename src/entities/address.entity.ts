import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	OneToOne,
} from "typeorm";
import { User } from "./user.entity";

@Entity("addresses")
export class Address {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ nullable: false })
	city: string;

	@Column({ nullable: false })
	state: string;

	@Column()
	zipCode: string;

	@Column()
	district: string;

	@Column()
	number: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@OneToOne(() => User, (user) => user.address)
	user: User;
}
