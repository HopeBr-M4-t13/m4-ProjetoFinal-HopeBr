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
	IMockedNewPost,
	mockedNewPost,
	mockedPostData,
	mockedUpdatePostData,
} from "../mocks/post.mocks";
import { mockedInsertCategories } from "../mocks/category.mocks";

describe("PATCH - /posts/:id", () => {
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

		newPost = await mockedNewPost();
	});

	afterEach(async () => {
		await request(app)
			.patch(`/posts/${newPost.id}`)
			.send(mockedPostData)
			.set("Authorization", `${userData.token}`);
	});

	afterAll(async () => {
		await connection.destroy();
	});

	test("Should be able to update post", async () => {
		const response = await request(app)
			.patch(`/posts/${newPost.id}`)
			.send(mockedUpdatePostData)
			.set("Authorization", `${userData.token}`);

		expect(response.status).toBe(200);
		expect(response.body).toEqual(
			expect.objectContaining({
				title: mockedUpdatePostData.title,
				content: mockedUpdatePostData.content,
				category: expect.objectContaining({
					id: mockedUpdatePostData.category,
				}),
			})
		);
	});

	test("Should be able to update post | admin update user post", async () => {
		const response = await request(app)
			.patch(`/posts/${newPost.id}`)
			.send(mockedUpdatePostData)
			.set("Authorization", `${adminData.token}`);

		expect(response.status).toBe(200);
		expect(response.body).toEqual(
			expect.objectContaining({
				title: mockedUpdatePostData.title,
				content: mockedUpdatePostData.content,
				category: expect.objectContaining({
					id: mockedUpdatePostData.category,
				}),
			})
		);
	});

	test("Should not be able to update post | user update another user post", async () => {
		const adminPost = (
			await request(app)
				.post("/posts")
				.send(mockedPostData)
				.set("Authorization", `${adminData.token}`)
		).body;

		const response = await request(app)
			.patch(`/posts/${adminPost.id}`)
			.send(mockedUpdatePostData)
			.set("Authorization", `${userData.token}`);

		expect(response.status).toBe(401);
		expect(response.body).toEqual({ message: "User not have permission" });
	});

	test("Should not be able to update post | no token", async () => {
		const response = await request(app)
			.patch(`/posts/${newPost.id}`)
			.send(mockedUpdatePostData)
			.set("Authorization", ``);

		expect(response.status).toBe(401);
		expect(response.body).toEqual({ message: "Invalid Token" });
	});

	test("Should not be able to update post | invalid token", async () => {
		const response = await request(app)
			.patch(`/posts/${newPost.id}`)
			.send(mockedUpdatePostData)
			.set("Authorization", `Bearer 45152acb2454ef545`);

		expect(response.status).toBe(401);
		expect(response.body).toEqual(
			expect.objectContaining({ message: "jwt malformed" })
		);
	});
});
