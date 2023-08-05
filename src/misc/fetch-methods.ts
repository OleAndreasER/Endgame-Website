import { testUriBase } from "../config/uri";

export const get = async (path: string): Promise<any> => {
  const response = await fetch(testUriBase + path, {
    credentials: "include",
  });
  return response.json();
};

export const put = async (
  path: string,
  body: {} | undefined = undefined
): Promise<any> => {
  if (body === undefined) {
    const response = await fetch(testUriBase + path, {
      method: "PUT",
      credentials: "include",
    });
    return response.json();
  }

  const response = await fetch(testUriBase + path, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    credentials: "include",
  });
  return response.json();
};

export const post = async (
  path: string,
  body: {} | undefined = undefined
): Promise<any> => {
  if (body === undefined) {
    const response = await fetch(testUriBase + path, {
      method: "POST",
      credentials: "include",
    });
    return response.json();
  }

  const response = await fetch(testUriBase + path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    credentials: "include",
  });
  return response.json();
};

export const del = async (
  path: string,
  body: {} | undefined = undefined
): Promise<any> => {
  if (body === undefined) {
    const response = await fetch(testUriBase + path, {
      method: "DELETE",
      credentials: "include",
    });
    return response.json();
  }

  const response = await fetch(testUriBase + path, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    credentials: "include",
  });
  return response.json();
};
