import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
} from "typeorm";
import { Category } from "./category.entity";
import { User } from "./user.entity";

@Entity("posts")
export class Post {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	title: string;

	@Column()
	content: string;

	@Column({ default: false })
	donated: boolean;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@ManyToOne(() => User, (user) => user.posts)
	user: User;

	@ManyToOne(() => Category, (category) => category.posts)
	category: Category;
}
