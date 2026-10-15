import HttpService from "@/Service/httpService";

class TipsService extends HttpService {
  async getHealthyTips(params?: any) {
    return this.getRequest({
      url: "/blog",
      config: { params },
    });
  }

  async getHealthyTipsDetails(slug: string) {
    return this.getRequest({
      url: `/blog/${slug}`,
    });
  }
}

const tipsService = new TipsService();
export default tipsService;
