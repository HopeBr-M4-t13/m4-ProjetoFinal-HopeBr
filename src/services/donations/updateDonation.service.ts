import AppDataSource from "../../data-source";
import { Donation } from "../../entities/donation.entity";
import { Image } from "../../entities/image.entity";
import { responseDonationUpdateSerializer } from "../../serializers/donations.serializers";

const updateDonationService = async (data, paramsId: string ) => {
    const donationsRepository = AppDataSource.getRepository(Donation)
    const imagesRep = AppDataSource.getRepository(Image)

    const findDonation = await donationsRepository.findOne({
        where: { id: paramsId }
    })

    if(data.image){
    const createImage = imagesRep.create({imageUrl: data.image})
    await imagesRep.save(createImage)

    data.image = createImage
    }
    
    const updateUser = donationsRepository.create({
        ...findDonation,
        ...data
    })

    await donationsRepository.save(updateUser)

    const dataResponse = await responseDonationUpdateSerializer.validate(updateUser, {
        stripUnknown: true
    })

    return dataResponse
}

export default updateDonationService
