import { DataSource } from "typeorm"
import { getAdminToken, getUserToken, IMockedUserData } from "../mocks/session.mocks"
import AppDataSource from "../../data-source"
import request from "supertest";
import app from "../../app";
import { mockedCreateDonation, mockedCreateDonationTwo, mockedDonationToUpdate, mockedDonationToUpdateIsActive } from "../mocks/donation.mocks";

describe("PATCH - /donations/:id", () => {
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

        await request(app)
        .post("/donations")
        .set("Authorization", `${userData.token}`)
        .send(mockedCreateDonation)

        await request(app)
        .post("/donations")
        .set("Authorization", `${adminData.token}`)
        .send(mockedCreateDonationTwo)

    });

    afterAll(async () =>{
        await connection.destroy()
    });

    test("Should be able to update donation | donation list yourself", async () => {
        const listDonation = await request(app)
        .get("/donations")

        const response = await request(app)
        .patch(`/donations/${listDonation.body[0].id}`)
        .send(mockedDonationToUpdate)
        .set("Authorization", `${userData.token}`);

        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("description")
        
    })

    test("Should be able to update donation | admin update donation another user", async () => {
        const listDonation = await request(app)
        .get("/donations")

        const response = await request(app)
        .patch(`/donations/${listDonation.body[0].id}`)
        .send(mockedDonationToUpdate)
        .set("Authorization", `${adminData.token}`);

        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("description")
        
    })

    test("Should not be able to update donation | try update isActive", async () => {
        const listDonation = await request(app)
        .get("/donations")

        await request(app)
        .delete(`/donations/${listDonation.body[0].id}`)
        .set("Authorization", `${adminData.token}`);

        const response = await request(app)
        .patch(`/donations/${listDonation.body[0].id}`)
        .send(mockedDonationToUpdate)
        .set("Authorization", `${adminData.token}`);

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message")
    })

    test("should not be able to update donation without authentication", async () => {
        const listDonation = await request(app)
        .get("/donations")

        const response = await request(app)
        .patch(`/donations/${listDonation.body[1].id}`)
        .send(mockedDonationToUpdate)
        
        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message");
    })

})