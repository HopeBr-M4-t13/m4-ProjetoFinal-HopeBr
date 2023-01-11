import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
} from "typeorm";
import { Donation } from "./donation.entity";
import { Post } from "./post.entity";

@Entity("categories")
export class Category {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ nullable: false })
	name: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@OneToMany(() => Donation, (donation) => donation.category)
	donations: Donation;

	@OneToMany(() => Post, (post) => post.category)
	posts: Post;
}
