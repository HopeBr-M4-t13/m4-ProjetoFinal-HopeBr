import { Request, Response, NextFunction } from "express"
import AppDataSource from "../data-source";
import { Address } from "../entities/address.entity";

const createAddressMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const addressesRep = AppDataSource.getRepository(Address)
    const address = req.body.address

    const createAddress = addressesRep.create(address)
    await addressesRep.save(createAddress)

    req.body.address = createAddress

    return next()
}

export default createAddressMiddleware;