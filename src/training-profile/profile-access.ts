import { get, post, put } from "../misc/fetch-methods";
import { Program } from "../program/program";
import { toServerProgram } from "../program/program-access";

export const getProfileName = (userId: string): Promise<string> =>
  get(`profiles/${userId}/active`);

export const getProfileNames = (userId: string): Promise<string[]> =>
  get(`profiles/${userId}`);

export const setActiveProfile = (
  userId: string,
  profileName: string
): Promise<string> => put(`profiles/${userId}/active`, { profileName });

export const createNewProfile = (
  userId: string,
  profileName: string,
  program: Program
): Promise<string> =>
  post(`profiles/${userId}/${profileName}`, toServerProgram(program));
