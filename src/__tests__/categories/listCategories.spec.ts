import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import app from "../../app";
import request from "supertest";

import { Category } from "../../entities/category.entity";
import { getAdminToken, getUserToken, IMockedUserData } from "../mocks/session.mocks";
import { mockedCategory } from "../mocks/category.mocks";

describe("GET - /categories", () => {
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

	test("Should be able to list categories", async () => {
		await request(app)
			.post("/categories")
			.send(mockedCategory)
			.set("Authorization", `${adminData.token}`);

		const response = await request(app)
			.get("/categories")
			.set("Authorization", `${adminData.token}`);

		expect(response.status).toBe(200);
		expect(response.body).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					id: expect.any(String),
					name: expect.any(String),
				}),
			])
		);
	});
});

	

	


