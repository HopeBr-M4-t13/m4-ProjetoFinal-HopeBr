import { Request, Response, NextFunction } from "express";
import { validate } from "uuid";
import AppDataSource from "../data-source";
import { Donation } from "../entities/donation.entity";
import AppError from "../errors/AppError";

const verifyIdDonationMiddleware = async (request: Request, response: Response, next: NextFunction) => {
  const donationsRepository = AppDataSource.getRepository(Donation);
  const validateId = validate(request.params.id)

  if(!validateId) {
      throw new AppError("Uuid Invalid", 400)
  }
  
  const findDonation = await donationsRepository.findOne({
    where: { id: request.params.id }
  })

  if(!findDonation){
    throw new AppError("Donation id invalid!", 404)
  }

  return next();
};

export default verifyIdDonationMiddleware;
