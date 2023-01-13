import AppDataSource from "../../data-source";
import { Address } from "../../entities/address.entity";
import { User } from "../../entities/user.entity";
import { IAddressUpdate } from "../../interfaces/users/users.interface";

const updateAddressService =async (addressBody: IAddressUpdate, userId: string): Promise<Address> => {
    const usersRep = AppDataSource.getRepository(User)
    const addressRep = AppDataSource.getRepository(Address)

    const findUser = await usersRep.findOne({
        where: {
            id: userId
        },
        relations: {
            address: true
        }
    })

    const findAddress = await addressRep.findOneBy({
        id: findUser.address.id
    })

    const updateAddress = addressRep.create({
        ...findAddress,
        ...addressBody
    })
    await addressRep.save(updateAddress)

    return updateAddress
} 

export default updateAddressService;
