
import { axiosClient } from "@/utils";
import { AxiosRequestConfig } from "axios";

type Prop = {
  config?: AxiosRequestConfig;
  body?: any;
  params?: any;
};

export function Brands({ config, body }: Prop) {
  return axiosClient.get(`/part/partbrands`, config);
}
