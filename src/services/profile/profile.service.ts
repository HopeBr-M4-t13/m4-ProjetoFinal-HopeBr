import listUserService from "../users/listUser.service";

const profileService = async (userData: string) => { 

  const user = listUserService(userData)

  return user;
};
export default profileService;
