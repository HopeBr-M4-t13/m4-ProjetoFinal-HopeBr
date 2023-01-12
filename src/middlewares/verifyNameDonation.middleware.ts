import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { Donation } from "../entities/donation.entity";
import AppError from "../errors/AppError";

const verifyNameDonationMiddleware = async (request: Request, response: Response, next: NextFunction) => {
  const donationsRepository = AppDataSource.getRepository(Donation);
  
  const findDonation = await donationsRepository.findOne({
    where: { name: request.body.name }
  })

  if(findDonation){
    throw new AppError("Donation already exists!", 404)
  }

  return next();
};

export default verifyNameDonationMiddleware;
