import AppDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";

const listDonationsByCategoryService = async (id: string): Promise<Category> => {
    const categoriesRep = AppDataSource.getRepository(Category)

    const findCategory = await categoriesRep.findOne({
        where: {
            id: id
        },
        relations: {
            donations: true
        }
    })

    return findCategory
}

export default listDonationsByCategoryService;