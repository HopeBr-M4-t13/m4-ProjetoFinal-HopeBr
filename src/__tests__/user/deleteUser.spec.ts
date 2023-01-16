import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import app from "../../app";
import request from "supertest";
import {
	getAdminToken,
	getUserToken,
	IMockedUserData,
} from "../mocks/session.mocks";
import { User } from "../../entities/user.entity";

describe("DELETE - /users/:id", () => {
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
		await AppDataSource.getRepository(User)
			.createQueryBuilder("users")
			.update(User)
			.set({ isActive: true })
			.execute();
	});

	afterAll(async () => {
		await connection.destroy();
	});

	test("Should be able to delete user", async () => {
		const response = await request(app)
			.delete(`/users/${userData.id}`)
			.set("Authorization", `${userData.token}`);

		expect(response.status).toBe(204);
		expect(response.body).toEqual({});
	});

	test("Should be able to delete user | admin delete user", async () => {
		const response = await request(app)
			.delete(`/users/${userData.id}`)
			.set("Authorization", `${adminData.token}`);

		expect(response.status).toBe(204);
		expect(response.body).toEqual({});
	});

	test("Should not be able to delete user | user delete another user", async () => {
		const response = await request(app)
			.delete(`/users/${adminData.id}`)
			.set("Authorization", `${userData.token}`);

		expect(response.status).toBe(401);
		expect(response.body).toEqual({ message: "User not have permission" });
	});
});
