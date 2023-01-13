import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import app from "../../app";
import request from "supertest";
import {
	getAdminToken,
	getUserToken,
	IMockedUserData,
} from "../mocks/session.mocks";
import { mockedUser } from "../mocks/user.mocks";

describe(" GET - /users and /users/:id", () => {
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

	afterAll(async () => {
		await connection.destroy();
	});

	test("Should be able to list users", async () => {
		const response = await request(app)
			.get("/users")
			.set("Authorization", `${adminData.token}`);

		expect(response.status).toBe(200);
		expect(response.body).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					id: expect.any(String),
					email: expect.any(String),
				}),
			])
		);
	});

	test("Should not be able to list users | user is not admin", async () => {
		const response = await request(app)
			.get("/users")
			.set("Authorization", `${userData.token}`);

		expect(response.status).toBe(401);
		expect(response.body).toEqual({ message: "User is not admin" });
	});

	test("Should be able to list user by id | user list yourself", async () => {
		const response = await request(app)
			.get(`/users/${userData.id}`)
			.set("Authorization", `${userData.token}`);

		expect(response.status).toBe(200);
		expect(response.body).toEqual(
			expect.objectContaining({
				id: expect.any(String),
				email: mockedUser.email,
			})
		);
	});

	test("Should be able to list user by id | admin list user", async () => {
		const response = await request(app)
			.get(`/users/${userData.id}`)
			.set("Authorization", `${adminData.token}`);

		expect(response.status).toBe(200);
		expect(response.body).toEqual(
			expect.objectContaining({
				id: expect.any(String),
				email: mockedUser.email,
			})
		);
	});

	test("Should not be able to list user by id | user list other user", async () => {
		const response = await request(app)
			.get(`/users/${adminData.id}`)
			.set("Authorization", `${userData.token}`);

		expect(response.status).toBe(401);
		expect(response.body).toEqual({ message: "User not have permission" });
	});
});
