import { PageParams } from "@/config/app-constant";
import HttpService from "@/Service/httpService";
import { CalculatorResult, InfantCalculatorPayload } from "@/types/infant.type";
import { VaccineStatus } from "@/types/vaccine";

class BabyService extends HttpService {
  async getAllBaby(params?: any) {
    try {
      const response = await this.getRequest({
        url: "/infant",
        config: {
          params,
          auth: true,
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async addBaby(data: any) {
    try {
      return await this.postRequest({
        url: "/infant",
        data,
        config: {
          auth: true,
          file: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async getBabbyDetails() {
    try {
      return await this.getRequest({
        url: "/infant",
        config: {
          auth: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async getVaccines(babyId: number, type: VaccineStatus = "A") {
    return this.getRequest({
      url: `/infant/${babyId}`,
      config: {
        params: { type },
        auth: true,
      },
    });
  }

  async getAllVaccines() {
    return this.getRequest({
      url: "/fetch-all-vaccines",
    });
  }

  async updateBaby(id: number, data: any) {
    try {
      data.append("_method", "PATCH");
      return await this.postRequest({
        url: `/infant/${id}`,
        data: data,
        config: {
          auth: true,
          file: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteBaby(id: number) {
    try {
      return await this.deleteRequest({
        url: `/infant/${id}`,
        config: {
          auth: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async updateBabyVaccineDate(infantId: number, vaccineId: number) {
    try {
      return await this.patchRequest({
        url: `/update-vaccinated-date/${infantId}`,
        data: { vaccine_id: vaccineId },
        config: { auth: true },
      });
    } catch (error) {
      throw error;
    }
  }

  async infantCalculator(payload: InfantCalculatorPayload) {
    return this.postRequest<{ data: CalculatorResult }>({
      url: "/infant-calculator",
      data: payload,
      config: { auth: true },
    });
  }

  async getInfantCalculatorHistory(infantId: number, params?: PageParams) {
    try {
      return await this.getRequest({
        url: `/infant-calculator/history/${infantId}`,
        config: {
          auth: true,
          params,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async getInfantChart(infantId: number, indicator: string) {
    try {
      return await this.getRequest({
        url: `/infant/${infantId}/chart`,
        config: {
          auth: true,
          params: { indicator },
        },
      });
    } catch (error) {
      throw error;
    }
  }
}

const babyService = new BabyService();
export default babyService;
