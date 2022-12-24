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
          response = await fetch(url);
          break;
        case "POST":
          response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
          break;
        case "PUT":
          response = await fetch(url, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
          break;
        case "DELETE":
          response = await fetch(url, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
          break;
        default:
          throw Error("Invalid HTTP request type");
      }
      if (response.ok) {
        const resultData = await response.json();
        setResult(resultData);
        setLoaded(true);
      }
    } catch (error) {
      setError(JSON.stringify(error));
      setLoaded(true);
    }
  };

  return [result, error, loaded, fetchData];
};

export default useFetch;
