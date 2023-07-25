import { del, get, post, put } from "../misc/fetch-methods";
import { Program } from "../program/program";
import { toServerProgram } from "../program/program-access";

export const getProfileName = (userId: string): Promise<string> =>
  get(`profiles/${userId}/active`);

export const getProfileNames = (userId: string): Promise<string[]> =>
  get(`profiles/${userId}`);

export const setActiveProfile = (
  userId: string,
  profileName: string
): Promise<string> =>
  put(`user/${userId}/active-training-profile`, { profileName });

export const createNewProfile = (
  userId: string,
  profileName: string,
  program: Program
): Promise<string> =>
  post(`profiles/${userId}/${profileName}`, toServerProgram(program));

export const renameProfile = (
  userId: string,
  oldName: string,
  newName: string
): Promise<string> =>
  put(`profiles/${userId}/${oldName}`, { profileName: newName });

export const deleteProfile = (
  userId: string,
  profileName: string
): Promise<string> => del(`profiles/${userId}/${profileName}`);
