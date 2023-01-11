import AppDataSource from "../../data-source";
import { Donation } from "../../entities/donation.entity";

const listDonationService = async (paramsId: string) => {
    const donationsRepository = AppDataSource.getRepository(Donation)

    const listDonation = await donationsRepository.findOne({
        where: { id: paramsId }
    })

    return listDonation
}

export default listDonationService;