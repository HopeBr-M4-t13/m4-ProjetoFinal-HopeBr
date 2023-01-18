import * as  yup from "yup"
import {SchemaOf} from "yup"
import ISessionUserRequest from "../interfaces/session/session.interface"

const sessionSerializer: SchemaOf<ISessionUserRequest> = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required()
})

export default sessionSerializer