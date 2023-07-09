import axios, { AxiosResponse } from "axios";
import config from "config";

import { logger } from "../../logger";

import { APIUser } from "./types";

const jsonplaceholderApi = config.get("jsonplaceholderApi") as string;

export const fetchUsers = async (): Promise<APIUser[]> => {
  try {
    const response: AxiosResponse<APIUser[]> = await axios.get(`${jsonplaceholderApi}/users`);
    return response.data;
  } catch (error) {
    logger.error("Failed to fetch users:", error);
    throw error;
  }
};
