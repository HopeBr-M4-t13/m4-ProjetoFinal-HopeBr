import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import app from "../../app";
import request from "supertest";
import {
	getAdminToken,
	getUserToken,
	IMockedUserData,
} from "../mocks/session.mocks";
import { mockedInsertCategories } from "../mocks/category.mocks";
import {
	IMockedNewPost,
	mockedNewPost,
	mockedPostData,
} from "../mocks/post.mocks";
import { after } from "node:test";

describe("DELETE - /posts/:id", () => {
	let connection: DataSource;

	let userData: IMockedUserData;
	let adminData: IMockedUserData;

	let newPost: IMockedNewPost;

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

	beforeEach(async () => {
		newPost = await mockedNewPost();
	});

	afterAll(async () => {
		await connection.destroy();
	});

	test("Should be able to delete post", async () => {
		const response = await request(app)
			.delete(`/posts/${newPost.id}`)
			.set("Authorization", `${userData.token}`);

		const checkPost = await request(app)
			.get(`/posts/${newPost.id}`)
			.set("Authorization", `${userData.token}`);

		expect(response.status).toBe(204);
		expect(checkPost.body).toEqual({ message: "Post not found" });
	});

	test("Should be able to delete post | admin delete user post", async () => {
		const response = await request(app)
			.delete(`/posts/${newPost.id}`)
			.set("Authorization", `${adminData.token}`);

		const checkPost = await request(app)
			.get(`/posts/${newPost.id}`)
			.set("Authorization", `${userData.token}`);

		expect(response.status).toBe(204);
		expect(checkPost.body).toEqual({ message: "Post not found" });
	});

	test("Should not be able to delete post | user delete another user post", async () => {
		const adminPost = (
			await request(app)
				.post(`/posts`)
				.send(mockedPostData)
				.set("Authorization", `${adminData.token}`)
		).body;

		const response = await request(app)
			.delete(`/posts/${adminPost.id}`)
			.set("Authorization", `${userData.token}`);

		expect(response.status).toBe(401);
		expect(response.body).toEqual({ message: "User not have permission" });
	});

	test("Should not be able to delete post | no token", async () => {
		const response = await request(app)
			.delete(`/posts/${newPost.id}`)
			.set("Authorization", ``);

		expect(response.status).toBe(401);
		expect(response.body).toEqual({ message: "Invalid Token" });
	});

	test("Should not be able to delete post | invalid token", async () => {
		const response = await request(app)
			.delete(`/posts/${newPost.id}`)
			.set("Authorization", `Bearer 6561ab6565ef544`);

		expect(response.status).toBe(401);
		expect(response.body).toEqual(
			expect.objectContaining({ message: "jwt malformed" })
		);
	});
});
