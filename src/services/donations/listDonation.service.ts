import AppDataSource from "../../data-source";
import { Donation } from "../../entities/donation.entity";
import { responseDonationUpdateSerializer } from "../../serializers/donations.serializers";

const listDonationService = async (paramsId: string) => {
    const donationsRepository = AppDataSource.getRepository(Donation)

    const listDonation = await donationsRepository.findOne({
        where: { id: paramsId },
        relations: { user: true, category: true, image: true }
    })

    const dataResponse = await responseDonationUpdateSerializer.validate(listDonation, {
        stripUnknown: true
    })
    
    return dataResponse
}

export default listDonationService;