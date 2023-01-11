import AppDataSource from "../../data-source";
import { Donation } from "../../entities/donation.entity";
import { returnDonationSerializer } from "../../serializers/donations.serializers";

const listDonationService = async (paramsId: string) => {
    const donationsRepository = AppDataSource.getRepository(Donation)

    const listDonation = await donationsRepository.findOne({
        where: { id: paramsId }
    })

    const dataResponse = await returnDonationSerializer.validate(listDonation, {
        stripUnknown: true
    })

    return dataResponse
}

export default listDonationService;