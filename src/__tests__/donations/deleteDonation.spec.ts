import { DataSource } from "typeorm"
import { getAdminToken, getUserToken, IMockedUserData } from "../mocks/session.mocks"
import AppDataSource from "../../data-source";
import request from "supertest";
import app from "../../app";
import { mockedCreateDonation, mockedCreateDonationThree, mockedCreateDonationTwo } from "../mocks/donation.mocks";

describe("DELETE - /donations/:id", () => {
    let connection: DataSource

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

        
        await request(app)
        .post("/donations")
        .set("Authorization", `${userData.token}`)
        .send(mockedCreateDonationTwo)
        
        await request(app)
        .post("/donations")
        .set("Authorization", `${userData.token}`)
        .send(mockedCreateDonation)

        await request(app)
        .post("/donations")
        .set("Authorization", `${adminData.token}`)
        .send(mockedCreateDonationThree)

	});

    afterAll(async () => {
        await connection.destroy();
    })

    test("Should be able to delete donation | donation delete yourself", async () =>{
        const listDonation = await request(app)
        .get("/donations")
        
        const response = await request(app)
        .delete(`/donations/${listDonation.body[0].id}`)
        .set("Authorization", `${adminData.token}`);

        expect(response.status).toBe(204);
        expect(response.body).toEqual({});

    })

    test("Should be able to delete donation | admin delete donations", async () =>{
        const listDonation = await request(app)
        .get("/donations")
        
        const response = await request(app)
        .delete(`/donations/${listDonation.body[1].id}`)
        .set("Authorization", `${adminData.token}`);

        expect(response.status).toBe(204);
        expect(response.body).toEqual({});

    })

    test("Should not be able to delete donations | user delete another donations", async () =>{
        const listDonation = await request(app)
        .get("/donations")

        const response = await request(app)
        .delete(`/donations/${listDonation.body[2].id}`)
        .set("Authorization", `${userData.token}`);

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message")
    })
})