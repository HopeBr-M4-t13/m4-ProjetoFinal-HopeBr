import AppDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";
import { Donation } from "../../entities/donation.entity";
import { Image } from "../../entities/image.entity";
import { User } from "../../entities/user.entity";
import { IDonationRequest } from "../../interfaces/donations/donations.interface";
import { returnDonationSerializer } from "../../serializers/donations.serializers";

const createDonationService = async (data: IDonationRequest, userId: string): Promise<Donation> => {
    const donationsRepository = AppDataSource.getRepository(Donation)
    const userRepository = AppDataSource.getRepository(User)
    const imageRepository = AppDataSource.getRepository(Image)
    const categoryRepository = AppDataSource.getRepository(Category)
    
    const user = await userRepository.findOne({
    where: { id: userId },
    withDeleted: true
    })

    const image = await imageRepository.findOne({
        where: { imageUrl: data.image },
        withDeleted: true
    })

    const category = await categoryRepository.findOne({
        where: { id: data.category },
        withDeleted: true
    })

    const createDonation = donationsRepository.create({
        ...data,
        user: user,
        image: image,
        category: category
    })

    await donationsRepository.save(createDonation)

    const dataResponse = await returnDonationSerializer.validate(createDonation, {
        stripUnknown: true
    })

    return createDonation
}

export default createDonationService
