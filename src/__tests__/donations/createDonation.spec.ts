import request from "supertest";
import { DataSource } from "typeorm"
import app from "../../app";
import AppDataSource from "../../data-source"
import { Donation } from "../../entities/donation.entity";
import { mockedCreateDonation, mockedCreateDonationTwo, mockedInvalidDonation } from "../mocks/donation.mocks";
import { getAdminToken, getUserToken, IMockedUserData } from "../mocks/session.mocks";


describe("POST - /donations", () => {
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
        await AppDataSource.getRepository(Donation)
        .createQueryBuilder("donations")
        .delete()
        .execute();
    })

    afterAll(async () =>{
        await connection.destroy();
    })

    test("Should be able to create donation | user Admin", async () =>{
        
        const response = await request(app)
        .post("/donations")
        .set("Authorization", `${adminData.token}`)
        .send(mockedCreateDonation)
        
        expect(response.status).toBe(201);

        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("description")
        expect(response.body).toHaveProperty("image")
        expect(response.body).toHaveProperty("category")

    }); 

    test("Should be able to create donation | user not Admin", async () =>{
        
        const response = await request(app)
        .post("/donations")
        .set("Authorization", `${userData.token}`)
        .send(mockedCreateDonationTwo)
        
        expect(response.status).toBe(201);

        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("description")
        expect(response.body).toHaveProperty("image")
        expect(response.body).toHaveProperty("category")

    }); 
    
    test("Should not be able to create donation | invalid body", async () => {
        const response = await request(app)
        .post("/donations")
        .set("Authorization", `${adminData.token || userData.token}`)
        .send(mockedInvalidDonation)

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message")
    });

    test("should not be able to create donation without authentication", async () => {
        const response = await request(app)
        .post("/donations")
        .send(mockedCreateDonation)

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message")
    })
});