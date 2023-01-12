import * as  yup from "yup"
import { SchemaOf } from "yup"
import { IDonationRequest, IDonationResponse } from "../../src/interfaces/donations/donations.interface";

export const donationSerializer: SchemaOf<IDonationRequest> = yup.object().shape({
    category: yup.string().required(),
    donated: yup.boolean(),
    image: yup.string(),
    name: yup.string().required(),
    description: yup.string().required()
})

export const returnDonationSerializer: SchemaOf<IDonationResponse> = yup.object().shape({
    id: yup.string(),
    name: yup.string(),
    description: yup.string(),
    category: yup.string(),
    donated: yup.boolean(),
    image: yup.string(),
    user: yup.string(),
    createdAt: yup.date(),
    updatedAt: yup.date()
})

export const listAllDonationsResponse: SchemaOf<IDonationResponse[]> = yup.array(returnDonationSerializer)

export const donationUpdateSerializer = yup.object().shape({
    name: yup.string(),
    description: yup.string()
})

export const responseDonationUpdateSerializer = yup.object().shape({
    id: yup.string(),
    name: yup.string(),
    description: yup.string(),
    createdAt: yup.date(),
    updatedAt: yup.date()
})




