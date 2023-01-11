import AppDataSource from "../../data-source";
import { Donation } from "../../entities/donation.entity";
import { IDonationRequest } from "../../interfaces/donations/donations.interface";

const updateDonationService = async (data: IDonationRequest, paramsId: string ): Promise<Donation> => {
    const donationsRepository = AppDataSource.getRepository(Donation)

    const findDonation = await donationsRepository.findOne({
        where: { id: paramsId }
    })
    
    const updateUser = donationsRepository.create({
        ...data,
        ...findDonation
    })

    await donationsRepository.save(updateUser)

    return updateUser
}

export default updateDonationService
