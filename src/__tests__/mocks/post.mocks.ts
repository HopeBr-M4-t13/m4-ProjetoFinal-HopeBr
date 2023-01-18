import app from "../../app";
import request from "supertest";
import { mockedCategories } from "./category.mocks";
import { getUserToken } from "./session.mocks";

interface IMockedNewPost {
	title: String;
	content: String;
	user?: {
		id: String;
		name: String;
		email: String;
		password?: String;
		contact: String;
		isActive?: true;
		isAdmin?: false;
		createdAt?: String;
		updatedAt?: String;
	};
	category: {
		id: String;
		name: String;
		createdAt?: String;
		updatedAt?: String;
	};
	id: String;
	donated: Boolean;
	createdAt: String;
	updatedAt: String;
}

const mockedPostData = {
	title: "Quero um livro",
	content: "Um livro muito bom",
	category: mockedCategories.Outros,
};

const mockedUpdatePostData = {
	title: "Post editado",
	content: "Esse post foi editado",
	category: mockedCategories.Eletrônicos,
};

const mockedNewPost = async (): Promise<IMockedNewPost> => {
	const userData = await getUserToken();
	const response = await request(app)
		.post("/posts")
		.send(mockedPostData)
		.set("Authorization", `${userData.token}`);

	return response.body;
};

export { mockedPostData, mockedNewPost, IMockedNewPost, mockedUpdatePostData };
