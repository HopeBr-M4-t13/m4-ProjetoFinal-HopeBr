import AppDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";
import { Donation } from "../../entities/donation.entity";
import { Image } from "../../entities/image.entity";

const updateDonationService = async (data, paramsId: string ) => {
    const donationsRep = AppDataSource.getRepository(Donation)
    const imagesRep = AppDataSource.getRepository(Image)
    const categoryRep = AppDataSource.getRepository(Category)  

    const findDonation = await donationsRep.findOne({
        where: { id: paramsId },
        relations: { image: true, category: true }
    })
   
    if(data.image){
    const findImage = await imagesRep.findOne({
        where: { id: findDonation.image?.id}
    })  
        if(findImage){
            const updateImage = imagesRep.create({
                ...findImage,
                imageUrl: data.image
            })
            await imagesRep.save(updateImage)
            data.image = updateImage
            }
        }
        const newImage = imagesRep.create(data.image)
        await imagesRep.save(newImage)
        data.image = newImage

    if(data.category){
    const findCategory = await categoryRep.findOne({
        where: { id: findDonation.category?.id }
    })
        if(findCategory){  
            const updateCategory = categoryRep.create({
            ...findCategory,
            name: data.category
        })
        await categoryRep.save(updateCategory)
        data.category = updateCategory
        }
    
        const newCategory = categoryRep.create(data.category)
        await categoryRep.save(newCategory)
        data.category = newCategory
    }
       
  
    
    const donationUpdate = donationsRep.create({
        ...findDonation,
        ...data
    })

    await donationsRep.save(donationUpdate)

    return donationUpdate
}

export default updateDonationService
