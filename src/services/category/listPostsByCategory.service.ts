import AppDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";

const listPostsByCategoryService = async (id: string): Promise<Category> => {
    const categoriesRep = AppDataSource.getRepository(Category)

    const findCategory = await categoriesRep.findOne({
        where: {
            id: id
        }, 
        relations: {
            posts: true
        }
    })

    return findCategory
}

export default listPostsByCategoryService;