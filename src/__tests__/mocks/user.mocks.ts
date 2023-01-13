const mockedUser = {
	name: "Teste",
	email: "teste@mail.com",
	password: "123456",
	contact: "teste@mail.com",
	isAdmin: false,
	address: {
		city: "Ribeirão Pires",
		state: "São Paulo",
		zipCode: "00000001",
		district: "Meu bairro",
		number: "10",
	},
	image: "url da imagem",
};

const mockedInvalidUser = {
	name: "Teste",
	email: "teste@mail.com",
	address: {
		city: "Ribeirão Pires",
		state: "São Paulo",
		zipCode: "00000001",
		district: "Meu bairro",
		number: "10",
	},
};

const mockedAdmin = {
	name: "Admin",
	email: "admin@mail.com",
	password: "123456",
	contact: "admin@mail.com",
	isAdmin: true,
	address: {
		city: "Ribeirão Pires",
		state: "São Paulo",
		zipCode: "00000001",
		district: "Meu bairro",
		number: "10",
	},
	image: "url da imagem admin",
};

const mockedUserToUpdate = {
	name: "usuario editado",
	email: "emaileditado@mail.com",
	password: "passwordeditado",
	contact: "contatoeditado@mail.com",
};

const mockedUserSessionData = {
	email: "teste@mail.com",
	password: "123456",
};

const mockedAdminSessionData = {
	email: "admin@mail.com",
	password: "123456",
};

export {
	mockedUser,
	mockedInvalidUser,
	mockedUserSessionData,
	mockedAdmin,
	mockedAdminSessionData,
	mockedUserToUpdate,
};
