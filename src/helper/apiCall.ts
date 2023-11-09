import axios, { AxiosResponse } from 'axios';
import https from 'https'
import http from 'http'

const baseUrl = process.env.API_URL;
interface apiCallParamsInterface {
  endPoint: string;
  method: string;
  payload?: any;
  params?: any;
  headers: any;
  timeout?: number;
  keepAlive?: boolean;
}

const apiCall = async (apiCallParams: apiCallParamsInterface): Promise<any> => {
  const { method, endPoint, payload, headers, params, timeout, keepAlive } = apiCallParams;
  try {
    const axiosInstance = axios.create({
      baseURL: baseUrl,
      timeout: 60000, // Default timeout of 5 seconds if not provided
      headers,
      params,
      httpAgent: new http.Agent({ keepAlive: true }),
      httpsAgent: new https.Agent({ keepAlive: true }),
    });

    // const response: AxiosResponse<any> = await axios({
    //   method,
    //   url: baseUrl + endPoint,
    //   data: payload,
    //   headers,
    //   params,
    // });
    const response: AxiosResponse<any> = await axiosInstance({
      method,
      url: endPoint,
      data: payload,
    });

    return {
      response: response.data,
      error: null
    }
  } catch (error) {
    return {
      response: null,
      error: error
    }
  }
};

export default apiCall;