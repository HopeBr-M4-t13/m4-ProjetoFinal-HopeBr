import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import app from "../../app";
import request from "supertest";

import { Category } from "../../entities/category.entity";
import { getAdminToken, getUserToken, IMockedUserData } from "../mocks/session.mocks";
import { mockedCategory } from "../mocks/category.mocks";

describe("GET - /categories/:id/posts", () => {
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

	test("Should be able to list posts by category id", async () => {
		const categoryTest = await request(app)
			.post("/categories")
			.send(mockedCategory)
			.set("Authorization", `${adminData.token}`);

		const response = await request(app)
			.get(`/categories/${categoryTest.body.id}/posts`)
			.set("Authorization", `${adminData.token}`);

		expect(response.body).toEqual(
			expect.objectContaining({
				id: expect.any(String),
				name: expect.any(String),
				posts: expect.any(Array)
			})
		);
		expect(response.status).toBe(200);
	});

	test("Should be able to list posts by category id | User no authentication", async () => {
		const categoryTest = await request(app)
			.post("/categories")
			.send(mockedCategory)
			.set("Authorization", `${adminData.token}`);

		const response = await request(app)
			.get(`/categories/${categoryTest.body.id}/posts`)

			expect(response.status).toBe(401);
			expect(response.body).toHaveProperty("message")
	});

	test("Should be able to list posts by category id | Id invalid", async () => {
        const response = await request(app)
        .get("/categories/04b591a2-76b3-4c95-bc4d-070cccac87b7/posts")
        .set("Authorization", `${adminData.token}`)

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message")
    });

});

	

	


