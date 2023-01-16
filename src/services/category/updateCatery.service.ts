import dataSource from "../../data-source";
import { Category } from "../../entities/category.entity";
import { ICategoryRequest } from "../../interfaces/category/category.interface";

const updateCateryService = async (id: string, data: ICategoryRequest): Promise<Category> => {
    const catergoriesRep = dataSource.getRepository(Category)

    const findCategory = await catergoriesRep.findOneBy({
        id: id
    })

    const updateCatery = catergoriesRep.create({
        ...findCategory,
        ...data
    })
    await catergoriesRep.save(updateCatery)

    return updateCatery
}

export default updateCateryService;