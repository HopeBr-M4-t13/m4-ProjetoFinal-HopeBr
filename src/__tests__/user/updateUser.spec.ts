import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import app from "../../app";
import request from "supertest";
import {
	getAdminToken,
	getUserToken,
	IMockedUserData,
} from "../mocks/session.mocks";
import { mockedUserToUpdate } from "../mocks/user.mocks";

describe("PATCH - /users/:id", () => {
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

	test("Should be able to update user", async () => {
		const response = await request(app)
			.patch(`/users/${userData.id}`)
			.send(mockedUserToUpdate)
			.set("Authorization", `${userData.token}`);

		expect(response.status).toBe(200);
		expect(response.body).toEqual(
			expect.objectContaining({
				id: expect.any(String),
				name: mockedUserToUpdate.name,
				email: mockedUserToUpdate.email,
				contact: mockedUserToUpdate.contact,
			})
		);
	});

	test("Should be able to update user | admin update another user", async () => {
		const response = await request(app)
			.patch(`/users/${userData.id}`)
			.send(mockedUserToUpdate)
			.set("Authorization", `${adminData.token}`);

		expect(response.status).toBe(200);
		expect(response.body).toEqual(
			expect.objectContaining({
				id: expect.any(String),
				name: mockedUserToUpdate.name,
				email: mockedUserToUpdate.email,
				contact: mockedUserToUpdate.contact,
			})
		);
	});

	test("Should not be able to update user | user update another user", async () => {
		const response = await request(app)
			.patch(`/users/${adminData.id}`)
			.send(mockedUserToUpdate)
			.set("Authorization", `${userData.token}`);

		expect(response.status).toBe(401);
		expect(response.body).toEqual({ message: "User not have permission" });
	});

	test("Should not be able to update user | try update isActive", async () => {
		const response = await request(app)
			.patch(`/users/${userData.id}`)
			.send({ isActive: false })
			.set("Authorization", `${userData.token}`);

		expect(response.status).toBe(401);
		expect(response.body).toEqual({
			message:
				"it is not allowed to edit the fields: isActive, IsAdm and id",
		});
	});
});
