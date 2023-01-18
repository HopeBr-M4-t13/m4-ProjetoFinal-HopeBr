import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import app from "../../app";
import request from "supertest";

import { Category } from "../../entities/category.entity";
import { getAdminToken, getUserToken, IMockedUserData } from "../mocks/session.mocks";
import { mockedCategory } from "../mocks/category.mocks";

describe("DELETE - /categories/:id", () => {
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

	test("Should be able to delete category by id", async () => {
		const categoryTest = await request(app)
       		.post("/categories")
        	.set("Authorization", `${adminData.token}`)
        	.send(mockedCategory)

		const response = await request(app)
			.delete(`/categories/${categoryTest.body.id}`)
			.set("Authorization", `${adminData.token}`);

		expect(response.status).toBe(204);
		expect(response.body).toEqual({});
	});

	test("Should be able to delete category by id | User no authentication", async () => {
		const categoryTest = await request(app)
			.post("/categories")
			.send(mockedCategory)
			.set("Authorization", `${adminData.token}`);

		const response = await request(app)
			.delete(`/categories/${categoryTest.body.id}`)

			expect(response.status).toBe(401);
			expect(response.body).toHaveProperty("message")
	});

	test("Should be able to delete category by id | No admin permission", async () => {
		const categoryTest = await request(app)
			.post("/categories")
			.send(mockedCategory)
			.set("Authorization", `${userData.token}`);

		const response = await request(app)
			.delete(`/categories/${categoryTest.body.id}`)

			expect(response.status).toBe(401);
			expect(response.body).toHaveProperty("message")
	});

	test("Should be able to delete category by id | Id invalid", async () => {
        const response = await request(app)
        .delete("/categories/04b591a2-76b3-4c95-bc4d-070cccac87b7")
        .set("Authorization", `${adminData.token}`)

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message")
    });
});

	

	


