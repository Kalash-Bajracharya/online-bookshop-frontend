import axios from "axios";

export const APIURL = import.meta.env.VITE_API_URL;

export function GetRequest(url) {
  const token = localStorage.getItem("token");

  const response = axios.get(`${APIURL}/${url}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  
  return response;
}

export function PostRequest(url, body) {
  const token = localStorage.getItem("token");
  

  const response = axios.post(`${APIURL}/${url}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

    return response;
}


export function PutRequest(url, body = {}) {
  const token = localStorage.getItem("token");

  return axios.put(`${APIURL}/${url}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
