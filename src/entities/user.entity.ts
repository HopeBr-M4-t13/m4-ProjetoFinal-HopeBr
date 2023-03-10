import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	OneToOne,
	BeforeUpdate,
	BeforeInsert,
	JoinColumn,
	OneToMany,
} from "typeorm";
import { getRounds, hashSync } from "bcryptjs";
import { Image } from "./image.entity";
import { Donation } from "./donation.entity";
import { Post } from "./post.entity";
import { Address } from "./address.entity";

@Entity("users")
export class User {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ nullable: false })
	name: string;

	@Column({ nullable: false, unique: true })
	email: string;

	@Column({ nullable: false })
	password: string;

	@Column({ nullable: false })
	contact: string;

	@Column({ default: true })
	isActive: boolean;

	@Column({ default: false })
	isAdmin: boolean;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@OneToOne(() => Address, (address) => address.user)
	@JoinColumn()
	address: Address;

	@OneToMany(() => Donation, (donation) => donation.user)
	donations: Donation;

	@OneToMany(() => Post, (post) => post.user)
	posts: Post;

	@OneToOne(() => Image)
	@JoinColumn()
	image: Image;

	@BeforeUpdate()
	@BeforeInsert()
	hashPassword() {
		const isEncrypted = getRounds(this.password);
		if (!isEncrypted) {
			this.password = hashSync(this.password, 10);
		}
	}
}
