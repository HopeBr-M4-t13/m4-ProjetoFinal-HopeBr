import AppDataSource from "../../data-source";
import { Donation } from "../../entities/donation.entity";

const listAllDonationsService = async () => {
    const donationsRepository = AppDataSource.getRepository(Donation)

    const listDonations = await donationsRepository.find()

    return listDonations
}

export default listAllDonationsService;