import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity("images")
export class Image {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ nullable: false, unique: true })
	imageUrl: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
