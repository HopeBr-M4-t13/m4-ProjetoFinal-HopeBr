import AppDataSource from "../../data-source";
import { Donation } from "../../entities/donation.entity";

const deleteDonationService = async (paramsId: string ) => {
    const donationsRepository = AppDataSource.getRepository(Donation)

    const findDonation = await donationsRepository.findOne({
        where: { id: paramsId }
    })
    
    await donationsRepository.save({...findDonation, isActive: false})
}

export default deleteDonationService
