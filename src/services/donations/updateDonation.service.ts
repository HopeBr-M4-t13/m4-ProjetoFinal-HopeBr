import AppDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";
import { Donation } from "../../entities/donation.entity";
import { Image } from "../../entities/image.entity";

const updateDonationService = async (data, paramsId: string ) => {
    const donationsRep = AppDataSource.getRepository(Donation)
    const imagesRep = AppDataSource.getRepository(Image)
    const categoryRep = AppDataSource.getRepository(Category)

    const findDonation = await donationsRep.findOne({
        where: { id: paramsId }
    })

    if(data.image){
    const findImage = await imagesRep.findOne({
        where: { id: findDonation.image.id }
    })
   
    const updateImage = imagesRep.create({
        imageUrl: data.image,
        ...findImage
    })
    await imagesRep.save(updateImage)
    data.image = updateImage
    }

    if(data.category){
    const findCategory = await categoryRep.findOne({
        where: { id: findDonation.category.id }
    })
       
    const updateCategory = categoryRep.create({
        name: data.category,
        ...findCategory
    })
    await categoryRep.save(updateCategory)
    data.category = updateCategory
    }
    
    const updateUser = donationsRep.create({
        ...findDonation,
        ...data
    })

    await donationsRep.save(updateUser)

    return updateUser
}

export default updateDonationService
