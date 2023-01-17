import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import app from "../../app";
import request from "supertest";

import { validate } from "uuid";
import { Category } from "../../entities/category.entity";
import { getAdminToken, getUserToken, IMockedUserData } from "../mocks/session.mocks";
import { mockedCategory, mockedInvalidCategory, mockedUpdateCategory } from "../mocks/category.mocks";

describe("PATCH - /categories/:id", () => {
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

	test("Should be able to update category by id", async () => {
		const categoryTest = await request(app)
			.post("/categories")
			.send(mockedCategory)
			.set("Authorization", `${adminData.token}`);

		const response = await request(app)
			.patch(`/categories/${categoryTest.body.id}`)
			.send(mockedUpdateCategory)
			.set("Authorization", `${adminData.token}`);

		expect(response.status).toBe(200);

		expect(validate(response.body.id)).toBeTruthy();

		expect(response.body).toEqual(
			expect.objectContaining({
				name: mockedUpdateCategory.name,
				id: expect.any(String),
			})
		);
	});

	test("Should be able to update category by id | Category already exists", async () => {
		await request(app)
			.post("/categories")
			.send(mockedUpdateCategory)
			.set("Authorization", `${adminData.token}`);

		const categoryTest = await request(app)
			.post("/categories")
			.send(mockedCategory)
			.set("Authorization", `${adminData.token}`);

		const response = await request(app)
			.patch(`/categories/${categoryTest.body.id}`)
			.send(mockedUpdateCategory)
			.set("Authorization", `${adminData.token}`);

		expect(response.status).toBe(409);

		expect(response.body).toHaveProperty("message");
	});

	test("Should be able to update category by id | Invalid body", async () => {
		const categoryTest = await request(app)
			.post("/categories")
			.send(mockedCategory)
			.set("Authorization", `${adminData.token}`);

		const response = await request(app)
			.patch(`/categories/${categoryTest.body.id}`)
			.send(mockedInvalidCategory)
			.set("Authorization", `${adminData.token}`);

		expect(response.status).toBe(400);

		expect(response.body).toHaveProperty("message");
	});

	test("Should be able to update category by id | User no authentication", async () => {
		const categoryTest = await request(app)
			.post("/categories")
			.send(mockedCategory)
			.set("Authorization", `${adminData.token}`);

		const response = await request(app)
			.patch(`/categories/${categoryTest.body.id}`)
			.send(mockedUpdateCategory)

		expect(response.status).toBe(401);
		expect(response.body).toHaveProperty("message");
	});

	test("Should be able to update category by id | No admin permission", async () => {
		const categoryTest = await request(app)
			.post("/categories")
			.send(mockedCategory)
			.set("Authorization", `${adminData.token}`);

		const response = await request(app)
			.patch(`/categories/${categoryTest.body.id}`)
			.send(mockedUpdateCategory)
			.set("Authorization", `${userData.token}`);

		expect(response.status).toBe(401);
		expect(response.body).toHaveProperty("message");
	});
});

	

	


