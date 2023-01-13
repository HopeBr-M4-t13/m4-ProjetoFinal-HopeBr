import "dotenv/config";
import request from "supertest";
import app from "../../app";
import {
	mockedAdmin,
	mockedAdminSessionData,
	mockedUser,
	mockedUserSessionData,
} from "./user.mocks";
import jwt from "jsonwebtoken";

interface IMockedUserData {
	id: String;
	token: String;
}

const getUserToken = async (): Promise<IMockedUserData> => {
	await request(app).post("/users").send(mockedUser);

	const response = await request(app)
		.post("/session")
		.send(mockedUserSessionData);

	const { token } = response.body;

	let id: String;

	jwt.verify(token, process.env.SECRET_KEY, (error, decoded: any) => {
		id = decoded.sub as string;
	});

	const returnedToken = "Bearer " + token;

	const returnedUser = {
		id,
		token: returnedToken,
	};

	return returnedUser;
};

const getAdminToken = async (): Promise<IMockedUserData> => {
	await request(app).post("/users").send(mockedAdmin);

	const response = await request(app)
		.post("/session")
		.send(mockedAdminSessionData);

	const { token } = response.body;

	let id: String;

	jwt.verify(token, process.env.SECRET_KEY, (error, decoded: any) => {
		id = decoded.sub as string;
	});

	const returnedToken = "Bearer " + token;

	const returnedAdmin = {
		id,
		token: returnedToken,
	};

	return returnedAdmin;
};

export { getUserToken, getAdminToken, IMockedUserData };
