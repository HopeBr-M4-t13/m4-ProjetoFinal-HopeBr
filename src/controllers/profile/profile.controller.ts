import { Request, Response } from "express"
import profileService from "../../services/profile/profile.service"

const profileController = async (req: Request, res: Response) => {
  const id = req.user.id
  const user = await profileService(id)
  return res.status(200).json(user)
}
export default profileController