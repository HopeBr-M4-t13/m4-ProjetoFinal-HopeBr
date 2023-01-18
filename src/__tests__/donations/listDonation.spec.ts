import { DataSource } from "typeorm"
import { getAdminToken, getUserToken, IMockedUserData } from "../mocks/session.mocks"
import AppDataSource from "../../data-source";
import request from "supertest";
import app from "../../app";
import {mockedCreateDonationTwo } from "../mocks/donation.mocks";

describe("GET - /donations", () => {
    let connection: DataSource

    let adminData: IMockedUserData;
    let userData: IMockedUserData;

    beforeAll(async () =>{
        await AppDataSource.initialize()
        .then((resp) => (connection = resp))
        .catch((error) =>
            console.error("Error during data source initialization", error)
        );

        adminData = await getAdminToken();
        userData = await getUserToken();

        await request(app)
        .post("/donations")
        .set("Authorization", `${adminData.token}`)
        .send(mockedCreateDonationTwo)
        
    });

    afterAll(async () => {
        await connection.destroy();
    });

    test("Should be able to list donations", async () => {
        const response = await request(app)
        .get("/donations")

        expect(response.body).toHaveLength(1);
        expect(response.status).toBe(200);
    });

    test("Should be able to list donation by id", async () => {
        const listDonation = await request(app)
        .get("/donations")

        const response = await request(app)
        .get(`/donations/${listDonation.body[0].id}`)
        .set("Authorization", `${adminData.token}`)

        expect(response.body).toHaveProperty("name");
        expect(response.body).toHaveProperty("description");
        expect(response.body).toHaveProperty("isActive");
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("updatedAt");
        expect(response.body).toHaveProperty("createdAt");
        expect(response.body).toHaveProperty("donated");
        expect(response.status).toBe(200);
    })


    test("Should be able to list donation by id | donation not exists", async () => {
        const response = await request(app)
        .get("/donations/04b591a2-76b3-4c95-bc4d-070cccac87b7")
        .set("Authorization", `${adminData.token}`)

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message")
    });

    test("should not be able to list donation without authentication", async () =>{
        const listDonation = await request(app)
        .get("/donations")

        const response = await request(app)
        .get(`/donations/${listDonation.body[0].id}`)

        expect(response.status).toBe(401)
        expect(response.body).toHaveProperty("message");
    });

    test("should not be able to list donation not active", async () =>{
        const listDonation = await request(app)
        .get("/donations")

        await request(app)
        .delete(`/donations/${listDonation.body[0].id}`)
        .set("Authorization", `${adminData.token}`);

        const response = await request(app)
        .get(`/donations/${listDonation.body[0].id}`)
        .set("Authorization", `${adminData.token}`)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message")

    })



})