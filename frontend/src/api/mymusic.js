import instance from "./base";

// import axios from "axios";
// const instance = axios.create({
//   // baseURL: process.env.REACT_APP_BASE_URL,
//   // baseURL: "https://j8a403.p.ssafy.io/api",
//   baseURL: "http://localhost:5555/api", // 로컬 테스트
//   // headers: {
//   //   Authorization: `Bearer ${localStorage.getItem("auth")}`,
//   // },
// });
// instance.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("auth")}`;

const musicUrl = `/music`;

export const getMusicList = async ({ userSeq, page = 1 }) => await instance.get(`${musicUrl}/${userSeq}?page=${page}`);

export const getMusicListByCondition = async ({ userSeq, filter = "", order = "", query = "", page = 1 }) =>
  await instance.get(`${musicUrl}/search/${userSeq}?filter=${filter}&order=${order}&query=${query}&page=${page}`);

export const uploadMusic = async (data) =>
  await instance.post(`${musicUrl}`, data, {
    headers: { "content-type": "multipart/form-data" },
  });

export const downloadMusic = async (musicSeq) =>
  await instance.get(`${musicUrl}/download/${musicSeq}`, {
    responseType: "blob",
  });

export const countMusic = async (userSeq) => await instance.get(`${musicUrl}/count/${userSeq}`);

export const splitMusic = async (musicSeq) => await instance.get(`${musicUrl}/inst/${musicSeq}`);
