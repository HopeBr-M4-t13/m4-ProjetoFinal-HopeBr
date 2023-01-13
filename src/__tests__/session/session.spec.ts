import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import app from "../../app";
import request from "supertest";
import { mockedUserSessionData, mockedUser } from "../mocks/user.mocks";
import { User } from "../../entities/user.entity";

describe("POST - /session", () => {
	let connection: DataSource;

	beforeAll(async () => {
		await AppDataSource.initialize()
			.then((resp) => (connection = resp))
			.catch((error) =>
				console.error("Error during data source initialization", error)
			);

		await request(app).post("/users").send(mockedUser);
	});

	afterAll(async () => {
		await connection.destroy();
	});

	test("Should be able to create session", async () => {
		const response = await request(app)
			.post("/session")
			.send(mockedUserSessionData);

		expect(response.status).toBe(200);
		expect(response.body).toEqual({ token: expect.any(String) });
	});

	test("Should not be able to create session | invalid body", async () => {
		const response = await request(app).post("/session").send();

		expect(response.status).toBe(400);
		expect(response.body).toEqual({ message: expect.any(Array) });
	});

	test("Should not be able to create session | invalid email", async () => {
		const response = await request(app)
			.post("/session")
			.send({ email: "batata@mail.com", password: mockedUser.password });

		expect(response.status).toBe(401);
		expect(response.body).toEqual({ message: "Email or password invalid" });
	});

	test("Should not be able to create session | invalid password", async () => {
		const response = await request(app)
			.post("/session")
			.send({ email: mockedUser.email, password: "batata" });

		expect(response.status).toBe(401);
		expect(response.body).toEqual({ message: "Email or password invalid" });
	});
});
