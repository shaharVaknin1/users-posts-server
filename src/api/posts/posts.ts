import axios, { AxiosResponse } from "axios";
import config from "config";

import { Post } from "../../common/types";
import { logger } from "../../logger";

const jsonplaceholderApi = config.get("jsonplaceholderApi") as string;

export const fetchPosts = async (userId: number): Promise<Post[]> => {
  try {
    const response: AxiosResponse<Post[]> = await axios.get(
      `${jsonplaceholderApi}/posts?userId=${userId}`
    );
    return response.data;
  } catch (error) {
    logger.error("Failed to fetch posts:", error);
    throw error;
  }
};
