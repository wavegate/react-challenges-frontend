import { BACKEND_URL } from "../constants";

const url = `${BACKEND_URL}/challenges`;

export const getChallenges = () => fetch(url).then((res) => res.json());

export const deleteChallenge = (_id: string) => {
  return fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ _id: _id }),
    credentials: "include",
  });
};

export const createChallenge = (data: any) => {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });
};

export const updateChallenge = (_id: string, data: any) => {
  return fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ _id, data }),
    credentials: "include",
  });
};
