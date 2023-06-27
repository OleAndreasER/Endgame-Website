import { get, put } from "../misc/fetchMethods";

export const getProfileName = (userId: string): Promise<string> =>
  get(`profiles/${userId}/active`);

export const getProfileNames = (userId: string): Promise<string[]> =>
  get(`profiles/${userId}`);

export const setActiveProfile = (
  userId: string,
  profileName: string
): Promise<string> => put(`profiles/${userId}/active`, { profileName });
