import AppDataSource from "../../data-source";
import { Donation } from "../../entities/donation.entity";
import { listAllDonationsResponse } from "../../serializers/donations.serializers";

const listAllDonationsService = async () => {
    const donationsRepository = AppDataSource.getRepository(Donation)

    const listDonations = await donationsRepository.find({
        relations:  { user: true, category: true, image: true }
    })

    const dataResponse = await listAllDonationsResponse.validate(listDonations, {
        stripUnknown: true
    })
    
    return dataResponse
}

export default listAllDonationsService;