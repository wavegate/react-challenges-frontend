import { BACKEND_URL } from "../constants";

const url = `${BACKEND_URL}/users`;

export const getUsers = () =>
  fetch(url, { credentials: "include" }).then((res) => res.json());

export const deleteUser = (_id: string) => {
  return fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ _id: _id }),
    credentials: "include",
  }).then((res) => res.json());
};

export const createUser = (data: any) => {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  }).then((res) => res.json());
};

export const loginUser = (data: any) => {
  return fetch(`${url}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  }).then((res) => res.json());
};

export const updateUser = (_id: string, data: any) => {
  return fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ _id, data }),
    credentials: "include",
  }).then((res) => res.json());
};
