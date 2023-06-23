import { get } from "../misc/fetchMethods";

export const getProfileName = (): Promise<string> => get("profiles/active/");

export const getProfileNames = (): Promise<string[]> => get("profiles/");
