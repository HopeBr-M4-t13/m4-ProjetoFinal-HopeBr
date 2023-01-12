import AppDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";
import { Donation } from "../../entities/donation.entity";
import { Image } from "../../entities/image.entity";
import { User } from "../../entities/user.entity";
import { IDonationRequest, IResponseCreateDonation } from "../../interfaces/donations/donations.interface";
import { responseDonationUpdateSerializer } from "../../serializers/donations.serializers";

const createDonationService = async (data: IDonationRequest, userId: string): Promise<IResponseCreateDonation> => {
    const donationsRepository = AppDataSource.getRepository(Donation)
    const userRepository = AppDataSource.getRepository(User)
    const imageRepository = AppDataSource.getRepository(Image)
    const categoryRepository = AppDataSource.getRepository(Category)
    
    const user = await userRepository.findOne({
    where: { id: userId },
    withDeleted: true
    })

    let image = {
        imageUrl: data.image
    }

    if(data.image){
        image = imageRepository.create({
            imageUrl: data.image
        })
        await imageRepository.save(image)
    }

    const category = await categoryRepository.findOne({
        where: { id: data.category },
        withDeleted: true
    })

    const createDonation = donationsRepository.create({
        ...data,
        user: user,
        image: image,
        category: category,
    })
    await donationsRepository.save(createDonation)

    const dataResponse = await responseDonationUpdateSerializer.validate(createDonation, {
        stripUnknown: true
    })

    return dataResponse
}

export default createDonationService
