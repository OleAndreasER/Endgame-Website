import { testUriBase } from "../config/uri";

const fetchByMethod = (
  method: "PUT" | "POST" | "GET" | "DELETE",
  path: string,
  body: any | undefined = undefined
): Promise<any | null> => {
  const requestInit: RequestInit =
    body === undefined
      ? {
          method: method,
          credentials: "include",
        }
      : {
          method: method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
          credentials: "include",
        };

  return fetch(testUriBase + path, requestInit)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      return Promise.reject(response);
    })
    .catch((reason) => {
      console.error(`Failed ${method} ${path}`);
      console.error(reason);
      return null;
    });
};

export const get = (path: string): Promise<any | null> =>
  fetchByMethod("GET", path);

export const put = (
  path: string,
  body: any | undefined = undefined
): Promise<any | null> => fetchByMethod("PUT", path, body);

export const post = (
  path: string,
  body: any | undefined = undefined
): Promise<any | null> => fetchByMethod("POST", path, body);

export const del = (
  path: string,
  body: any | undefined = undefined
): Promise<any | null> => fetchByMethod("DELETE", path, body);
