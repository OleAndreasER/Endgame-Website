import { testUriBase } from "../config/uri";

export const get = async (path: string): Promise<any> => {
  const response = await fetch(testUriBase + path, {
    credentials: "include",
  }).catch(() => {
    console.error("Failed GET " + path);
    return null;
  });
  if (response === null) return null;
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
    }).catch(() => {
      console.error("Failed PUT " + path);
      return null;
    });

    if (response === null) return null;
    return response.json();
  }

  // With json body
  const response = await fetch(testUriBase + path, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    credentials: "include",
  }).catch(() => {
    console.error("Failed PUT " + path);
    return null;
  });
  if (response === null) return null;
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
    }).catch(() => {
      console.error("Failed POST " + path);
      return null;
    });

    if (response === null) return null;
    return response.json();
  }

  const response = await fetch(testUriBase + path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    credentials: "include",
  }).catch(() => {
    console.error("Failed POST " + path);
    return null;
  });
  if (response === null) return null;
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
    }).catch(() => {
      console.error("Failed DELETE " + path);
      return null;
    });
    if (response === null) return null;
    return response.json();
  }

  const response = await fetch(testUriBase + path, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    credentials: "include",
  }).catch(() => {
    console.error("Failed DELETE " + path);
    return null;
  });

  if (response === null) return null;
  return response.json();
};
