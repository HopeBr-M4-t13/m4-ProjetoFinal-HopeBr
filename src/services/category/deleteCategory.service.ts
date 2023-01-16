import dataSource from "../../data-source";
import { Category } from "../../entities/category.entity";

const deleteCategoryService = async (id: string) => {
    const categoriesRep = dataSource.getRepository(Category)

    await categoriesRep.createQueryBuilder('categories')
        .delete()
        .from(Category)
        .where("id = :id", {id: id})
        .execute()

    return {}
}

export default deleteCategoryService;