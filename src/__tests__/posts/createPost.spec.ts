import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import app from "../../app";
import request from "supertest";
import {
	getAdminToken,
	getUserToken,
	IMockedUserData,
} from "../mocks/session.mocks";
import {
	mockedCategories,
	mockedInsertCategories,
} from "../mocks/category.mocks";
import { mockedPostData } from "../mocks/post.mocks";

describe("POST - /posts", () => {
	let connection: DataSource;

	let userData: IMockedUserData;
	let adminData: IMockedUserData;

	beforeAll(async () => {
		await AppDataSource.initialize()
			.then((resp) => (connection = resp))
			.catch((error) =>
				console.error("Error during data source initialization", error)
			);

		userData = await getUserToken();
		adminData = await getAdminToken();

		await mockedInsertCategories();
	});

	afterAll(async () => {
		await connection.destroy();
	});

	test("Should be able to create post", async () => {
		const response = await request(app)
			.post("/posts")
			.send(mockedPostData)
			.set("Authorization", `${userData.token}`);

		expect(response.status).toBe(201);
		expect(response.body).toEqual(
			expect.objectContaining({
				title: mockedPostData.title,
				content: mockedPostData.content,
				category: expect.objectContaining({
					id: mockedPostData.category,
				}),
				id: expect.any(String),
				user: expect.any(Object),
			})
		);
	});

	test("Should not be able to create post | invalid body", async () => {
		const response = await request(app)
			.post("/posts")
			.send({ title: mockedPostData.title })
			.set("Authorization", `${userData.token}`);

		expect(response.status).toBe(400);
		expect(response.body).toEqual(
			expect.objectContaining({
				message: expect.any(Array),
			})
		);
	});

	test("Should not be able to create post | invalid token", async () => {
		const response = await request(app)
			.post("/posts")
			.send(mockedPostData)
			.set("Authorization", `Bearer 5062f56056c54b`);

		expect(response.status).toBe(401);
		expect(response.body).toEqual(
			expect.objectContaining({ message: "jwt malformed" })
		);
	});

	test("Should not be able to create post | no token", async () => {
		const response = await request(app)
			.post("/posts")
			.send(mockedPostData)
			.set("Authorization", ``);

		expect(response.status).toBe(401);
		expect(response.body).toEqual(
			expect.objectContaining({ message: "Invalid Token" })
		);
	});

	test("Should not be able to create post | invalid category", async () => {
		const response = await request(app)
			.post("/posts")
			.send({
				title: mockedPostData.title,
				content: mockedPostData.content,
				category: "65b66ee1-e4ef-4a5b-b049-1e1fd46e2e92",
			})
			.set("Authorization", `${userData.token}`);

		expect(response.status).toBe(404);
		expect(response.body).toEqual(
			expect.objectContaining({ message: "Category not found" })
		);
	});
});
