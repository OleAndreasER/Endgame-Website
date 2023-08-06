import { del, get, post, put } from "../misc/fetch-methods";
import { Program } from "../program/program";
import { toServerProgram } from "../program/program-access";

export const getProfileName = (userId: string): Promise<string> =>
  get(`profiles/active`);

export const getProfileNames = (userId: string): Promise<string[]> =>
  get(`profiles`);

export const setActiveProfile = (
  userId: string,
  profileName: string
): Promise<string> => put(`users/active-training-profile`, { profileName });

export const createNewProfile = (
  userId: string,
  profileName: string,
  program: Program
): Promise<string> => post(`profiles/${profileName}`, toServerProgram(program));

export const renameProfile = (
  userId: string,
  oldName: string,
  newName: string
): Promise<string> => put(`profiles/${oldName}`, { profileName: newName });

export const deleteProfile = (
  userId: string,
  profileName: string
): Promise<string> => del(`profiles/${profileName}`);
