import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import app from "../../app";
import request from "supertest";
import {
	getAdminToken,
	getUserToken,
	IMockedUserData,
} from "../mocks/session.mocks";
import { IMockedNewPost, mockedNewPost } from "../mocks/post.mocks";
import { mockedInsertCategories } from "../mocks/category.mocks";

describe("GET - /posts and /posts/:id", () => {
	let connection: DataSource;

	let userData: IMockedUserData;
	let adminData: IMockedUserData;

	let newPost: IMockedNewPost;

	beforeAll(async () => {
		await AppDataSource.initialize()
			.then((resp) => (connection = resp))
			.catch((error) =>
				console.error("Error during data source initialiation", error)
			);

		userData = await getUserToken();
		adminData = await getAdminToken();

		await mockedInsertCategories();

		newPost = await mockedNewPost();
	});

	afterAll(async () => {
		await connection.destroy();
	});

	test("Should be able to list posts", async () => {
		const response = await request(app)
			.get("/posts")
			.set("Authorization", `${userData.token}`);

		expect(response.status).toBe(200);
		expect(response.body).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					id: expect.any(String),
					title: expect.any(String),
					content: expect.any(String),
				}),
			])
		);
	});

	test("Should not be able to list posts | no token", async () => {
		const response = await request(app)
			.get("/posts")
			.set("Authorization", ``);

		expect(response.status).toBe(401);
		expect(response.body).toEqual({ message: "Invalid Token" });
	});

	test("Should not be able to list posts | invalid token", async () => {
		const response = await request(app)
			.get("/posts")
			.set("Authorization", `Bearer 652cb15a92d9292f9e`);

		expect(response.status).toBe(401);
		expect(response.body).toEqual(
			expect.objectContaining({ message: "jwt malformed" })
		);
	});

	test("Should be able to list post by id", async () => {
		const response = await request(app)
			.get(`/posts/${newPost.id}`)
			.set("Authorization", `${userData.token}`);

		expect(response.status).toBe(200);
		expect(response.body).toEqual(expect.objectContaining({ ...newPost }));
	});

	test("Should not be able to list post by id | no token", async () => {
		const response = await request(app)
			.get(`/posts/${newPost.id}`)
			.set("Authorization", ``);

		expect(response.status).toBe(401);
		expect(response.body).toEqual({ message: "Invalid Token" });
	});

	test("Should not be able to list post by id | invalid token", async () => {
		const response = await request(app)
			.get(`/posts/${newPost.id}`)
			.set("Authorization", `Bearer 652cb15a92d9292f9e`);

		expect(response.status).toBe(401);
		expect(response.body).toEqual(
			expect.objectContaining({ message: "jwt malformed" })
		);
	});

	test("Should not be able to list post by id | invalid post id", async () => {
		const response = await request(app)
			.get(`/posts/b3080ac3-0b4d-4291-928b-e2fd2468cb20`)
			.set("Authorization", `${userData.token}`);

		expect(response.status).toBe(404);
		expect(response.body).toEqual({ message: "Post not found" });
	});
});
