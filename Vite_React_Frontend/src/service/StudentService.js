import { api } from "../api/api";

// React service
export const studentList = () => {
  return api.get("/studentList");
};

export const studentById = (studentName) => {
  return api.get(`/studentById?name=${studentName}`);
};

export const studentByName = (studentId) => {
  return api.get(`/studentByName?student_id=${studentId}`);
};

export const addStudent = (data) => {
  return api.post("/addStudent", data);
};

export const deleteStudent = (studentId) => {
  return api.delete(`/deleteStudent/${studentId}`);
};

export const editStudent = (data) => {
  return api.put("/editStudent", data);
};