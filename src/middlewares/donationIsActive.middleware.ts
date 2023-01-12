import { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError";
import AppDataSource from "../data-source";
import { Donation } from "../entities/donation.entity";

const donationIsActive = async (request: Request, response: Response, next: NextFunction) => {

  const donationsRepository = AppDataSource.getRepository(Donation);

  const findDonation = await donationsRepository.findOne({
    where: { id: request.params.id }
  })

  if(findDonation.isActive == false){
    throw new AppError("Donation is not active", 403);
  }

  return next();

};

export default donationIsActive;
