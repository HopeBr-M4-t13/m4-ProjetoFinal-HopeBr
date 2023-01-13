import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import app from "../../app";
import request from "supertest";

import { validate } from "uuid";
import { User } from "../../entities/user.entity";
import { Image } from "../../entities/image.entity";

import { mockedUser, mockedInvalidUser } from "../mocks/user.mocks";

describe("POST - /users", () => {
	let connection: DataSource;

	beforeAll(async () => {
		await AppDataSource.initialize()
			.then((resp) => (connection = resp))
			.catch((error) =>
				console.error("Error during data source initialization", error)
			);
	});

	beforeEach(async () => {
		await AppDataSource.getRepository(User)
			.createQueryBuilder("users")
			.delete()
			.execute();

		await AppDataSource.getRepository(Image)
			.createQueryBuilder("images")
			.delete()
			.execute();
	});

	afterAll(async () => {
		await connection.destroy();
	});

	test("Should be able to create user", async () => {
		const response = await request(app).post("/users").send(mockedUser);

		expect(response.status).toBe(201);

		expect(validate(response.body.id)).toBeTruthy();

		expect(response.body).toEqual(
			expect.objectContaining({
				email: mockedUser.email,
				id: expect.any(String),
			})
		);
	});

	test("Should not be able to create user | user already exists", async () => {
		await request(app).post("/users").send(mockedUser);

		const response = await request(app).post("/users").send(mockedUser);

		expect(response.status).toBe(409);

		expect(response.body).toEqual(
			expect.objectContaining({ message: "This user already exists" })
		);
	});

	test("Should not be able to create user | invalid body", async () => {
		const response = await request(app)
			.post("/users")
			.send(mockedInvalidUser);

		expect(response.status).toBe(400);

		expect(response.body).toEqual(
			expect.objectContaining({ message: expect.any(Array) })
		);
	});
});
