import AppDataSource from "../../data-source";
import { Category } from "../../entities/category.entity";

const deleteCategoryService = async (id: string): Promise<{}> => {
    const categoriesRep = AppDataSource.getRepository(Category)

    await categoriesRep.createQueryBuilder('categories')
        .delete()
        .from(Category)
        .where("id = :id", {id: id})
        .execute()

    return {}
}

export default deleteCategoryService;