import { testUriBase } from "../config/uri";

export const get = async (path: string): Promise<any> => {
  const response = await fetch(testUriBase + path);
  return response.json();
};

export const put = async (
  path: string,
  body: {} | undefined = undefined
): Promise<any> => {
  if (body === undefined) {
    const response = await fetch(testUriBase + path, {
      method: "PUT",
    });
    return response.json();
  }

  const response = await fetch(testUriBase + path, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
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
    });
    return response.json();
  }

  const response = await fetch(testUriBase + path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return response.json();
};

export const del = async (path: string): Promise<any> => {
  const response = await fetch(testUriBase + path, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  return response.json();
};
