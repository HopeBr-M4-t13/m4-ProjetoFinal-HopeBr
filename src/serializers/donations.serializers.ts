import * as  yup from "yup"
import { SchemaOf } from "yup"
import { IDonationRequest, IDonationResponse, IResponseCreateDonation } from "../../src/interfaces/donations/donations.interface";
import { categoryResponseSerializer } from "./category.serializer";

export const donationSerializer: SchemaOf<IDonationRequest> = yup.object().shape({
    category: yup.string().required(),
    donated: yup.boolean().notRequired(),
    image: yup.string().notRequired(),
    name: yup.string().required(),
    description: yup.string().required()
})

export const returnDonationSerializer: SchemaOf<IDonationResponse> = yup.object().shape({
    id: yup.string(),
    name: yup.string(),
    description: yup.string(),
    category: yup.string(),
    donated: yup.boolean(),
    isActive: yup.boolean(),
    image: yup.string(),
    user: yup.string(),
    createdAt: yup.date(),
    updatedAt: yup.date()
})

export const listAllDonationsResponse: SchemaOf<IDonationResponse[]> = yup.array(returnDonationSerializer)

export const donationUpdateSerializer = yup.object().shape({
    name: yup.string(),
    description: yup.string(),
    category: yup.string(),
    imageUrl: yup.string(),
    donated: yup.boolean()
})

export const responseDonationUpdateSerializer:SchemaOf<IResponseCreateDonation> = yup.object().shape({
    id: yup.string(),
    name: yup.string(),
    description: yup.string(),
    donated: yup.boolean(),
    isActive: yup.boolean(),
    createdAt: yup.date(),
    updatedAt: yup.date(),
    image: yup.object({
        id: yup.string(),
        imageUrl: yup.string(),
        createdAt: yup.date(),
        updatedAt: yup.date(),
    }).nullable(true),
    category: categoryResponseSerializer.nullable(true),
    user: yup.object({
        id: yup.string(),
        name: yup.string(),
        email: yup.string(),
        contact: yup.string(),
        isAdmin: yup.boolean(),
        isActive: yup.boolean(),
        image: yup.string(),
        address: yup.string(),
        createdAt: yup.date(),
        updatedAt: yup.date()
    }),
})




