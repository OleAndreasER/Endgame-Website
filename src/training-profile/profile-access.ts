import { get } from "../misc/fetchMethods";

export const getProfileName = (userId: string): Promise<string> =>
  get(`profiles/${userId}/active`);

export const getProfileNames = (userId: string): Promise<string[]> =>
  get(`profiles/${userId}`);
