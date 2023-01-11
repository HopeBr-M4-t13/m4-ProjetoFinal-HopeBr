import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	OneToOne,
	JoinColumn,
	ManyToOne,
} from "typeorm";
import { Category } from "./category.entity";
import { Image } from "./image.entity";
import { User } from "./user.entity";

@Entity("donations")
export class Donation {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	name: string;

	@Column()
	description: string;

	@Column()
	donated: boolean;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@ManyToOne(() => User, (user) => user.donations)
	user: User;

	@OneToOne(() => Image)
	@JoinColumn()
	image: Image;

	@ManyToOne(() => Category, (category) => category.donations)
	category: Category;
}
