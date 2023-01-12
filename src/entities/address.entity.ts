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

	@Column({ nullable: false })
	zipCode: string;

	@Column({ nullable: false })
	district: string;

	@Column({ nullable: false })
	number: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@OneToOne(() => User, (user) => user.address)
	user: User;
}
