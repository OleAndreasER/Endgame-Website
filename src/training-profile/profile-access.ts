import { del, get, post, put } from "../misc/fetch-methods";
import { Program } from "../program/program";
import { toServerProgram } from "../program/program-access";

export const getProfileName = (): Promise<string | null> =>
  get(`profiles/active`);

export const getProfileNames = (): Promise<string[] | null> => get(`profiles`);

export const setActiveProfile = (profileName: string): Promise<string | null> =>
  put(`users/active-training-profile`, { profileName });

export const createNewProfile = (
  profileName: string,
  program: Program
): Promise<string | null> =>
  post(`profiles/${profileName}`, toServerProgram(program));

export const renameProfile = (
  oldName: string,
  newName: string
): Promise<string | null> =>
  put(`profiles/${oldName}`, { profileName: newName });

export const deleteProfile = (profileName: string): Promise<string | null> =>
  del(`profiles/${profileName}`);
