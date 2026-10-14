import HttpServices from "@/Service/httpService";

class BabyService extends HttpServices {
  // ✅ Fetch all vaccines
  async getAllVaccines() {
    try {
      return await this.getRequest({
        url: "/fetch-all-vaccines",
      });
    } catch (error) {
      throw error;
    }
  }

  async getHealthyTips(params?: any) {
    try {
      return await this.getRequest({
        url: "/blog",
        config: {
          params,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async getHealthyTipsDetails(slug: string) {
    try {
      return await this.getRequest({
        url: `/blog/${slug}`,
      });
    } catch (error) {
      throw error;
    }
  }
  async getAllHospital(params?: any) {
    try {
      return await this.getRequest({
        url: "/hospital",
        config: {
          params,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}

const babyService = new BabyService();
export default babyService;
