import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import app from "../../app";
import request from "supertest";

import { validate } from "uuid";
import { Category } from "../../entities/category.entity";
import { getAdminToken, getUserToken, IMockedUserData } from "../mocks/session.mocks";
import { mockedCategory, mockedInvalidCategory } from "../mocks/category.mocks";

describe("POST - /categories", () => {
	let connection: DataSource;

	let adminData: IMockedUserData;
	let userData: IMockedUserData;

	beforeAll(async () => {
		await AppDataSource.initialize()
			.then((resp) => (connection = resp))
			.catch((error) =>
				console.error("Error during data source initialization", error)
			);

		adminData = await getAdminToken();

		userData = await getUserToken();
	});

	beforeEach(async () => {
		await AppDataSource.getRepository(Category)
			.createQueryBuilder("categories")
			.delete()
			.execute();
	});

	afterAll(async () => {
		await connection.destroy();
	});

	test("Should be able to create category", async () => {
		const response = await request(app)
			.post("/categories")
			.send(mockedCategory)
			.set("Authorization", `${adminData.token}`);

		expect(response.status).toBe(201);

		expect(validate(response.body.id)).toBeTruthy();

		expect(response.body).toEqual(
			expect.objectContaining({
				name: mockedCategory.name,
				id: expect.any(String),
			})
		);
	});

	test("Should not be able to create category | Category already exists", async () => {
		await request(app)
			.post("/categories")
			.send(mockedCategory)
			.set("Authorization", `${adminData.token}`);

		const response = await request(app)
			.post("/categories")
			.send(mockedCategory)
			.set("Authorization", `${adminData.token}`);

		expect(response.status).toBe(409);

		expect(response.body).toHaveProperty("message");
	});

	test("Should not be able to create category | Invalid body", async () => {
		const response = await request(app)
			.post("/categories")
			.send(mockedInvalidCategory)
			.set("Authorization", `${adminData.token}`);

		expect(response.status).toBe(400);

		expect(response.body).toHaveProperty("message");
	});

	test("Should not be able to create category | User no authentication", async () => {
		const response = await request(app)
			.post(`/categories`)
			.send(mockedCategory);

		expect(response.status).toBe(401);
		expect(response.body).toHaveProperty("message");
	});

	test("Should not be able to create category | No admin permission", async () => {
		const response = await request(app)
			.post(`/categories`)
			.send(mockedCategory)
			.set("Authorization", `${userData.token}`);

		expect(response.status).toBe(401);
		expect(response.body).toHaveProperty("message");
	});
});

	

	


