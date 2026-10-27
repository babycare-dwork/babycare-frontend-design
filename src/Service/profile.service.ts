import HttpService from "@/Service/httpService";

class ProfileService extends HttpService {
  async getProfile() {
    return this.getRequest({
      url: "/market/user/profile",
    });
  }

  async updateProfile(payload: any) {
    return this.postRequest({
      url: "/market/user/profile",
      data: payload,
      config: { file: payload instanceof FormData },
    });
  }
}

const profileService = new ProfileService();
export default profileService;
