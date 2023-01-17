import {Request, Response} from "express"
import { IDonationRequest } from "../../interfaces/donations/donations.interface"
import createDonationService from "../../services/donations/createDonation.service"
import deleteDonationService from "../../services/donations/deleteDonation.service"
import listAllDonationsService from "../../services/donations/listAllDonations.service"
import listDonationService from "../../services/donations/listDonation.service"
import updateDonationService from "../../services/donations/updateDonation.service"

export const createDonationController = async (req: Request, res: Response) => {
    const userId: string = req.user.id
    const donationData: IDonationRequest = req.body
    const data = await createDonationService(donationData, userId)
    return res.status(201).json(data)
}


export const updateDonationController = async (req: Request, res: Response) => {
    const paramsId: string = req.params.id
    const donationData: IDonationRequest = req.body
    const data = await updateDonationService(donationData, paramsId)
    return res.status(200).json(data)
}

export const listAllDonationsController = async (req: Request, res: Response) => {
    const listDonations = await listAllDonationsService()
    return res.status(200).json(listDonations)
}

export const listDonationController = async (req: Request, res: Response) => {
    const paramsId: string = req.params.id
    const listDonations = await listDonationService(paramsId)
    return res.status(200).json(listDonations)
}

export const deleteDonationController = async (req: Request, res: Response) => {
    const paramsId: string = req.params.id
    await deleteDonationService(paramsId)
    return res.status(204).json({})
}

