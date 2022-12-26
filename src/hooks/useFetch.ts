import { useState } from "react";

type RequestType = "GET" | "POST" | "PUT" | "DELETE";

const useFetch = (url: string) => {
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [loaded, setLoaded] = useState<boolean>(false);

  const fetchData = async (type: RequestType, data?: any) => {
    setLoaded(false);
    let response;
    try {
      switch (type) {
        case "GET":
          response = await fetch(url, {
            credentials: "include",
          });
          break;
        case "POST":
          response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: "include",
          });
          break;
        case "PUT":
          response = await fetch(url, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: "include",
          });
          break;
        case "DELETE":
          response = await fetch(url, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: "include",
          });
          break;
        default:
          throw Error("Invalid HTTP request type");
      }
      const resultData = await response.json();
      if (response.ok) {
        setResult(resultData);
        setLoaded(true);
      } else {
        throw new Error(JSON.stringify(resultData));
      }
    } catch (error) {
      setError((error as Error).message);
      setLoaded(true);
    }
  };

  return [result, error, loaded, fetchData];
};

export default useFetch;
