import { v4 as uuid } from "uuid";

const read = (key) => {
  const data = localStorage.getItem(key);
  if (null === data) {
    return [];
  }
  return JSON.parse(data);
};

const write = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};
export const dbGet = (key) => {
  return read(key);
};
export const dbAdd = ({ key, data }) => {
  const currentData = read(key);
  data.id = uuid();
  currentData.push(data);
  write(key, currentData);
};

export const dbDeleteById = ({ key, id }) => {
  const currentData = read(key);
  const deletedData = currentData.filter((item) => item.id !== id);
  write(key, deletedData);
};

export const dbUpdate = ({ key, data }) => {
  const currentData = read(key);
  const updatedData = currentData.map((item) => (item.id === data.id ? { ...data } : { ...item }));
  write(key, updatedData);
};

// const dbSaveAll = (key, data) => {
//   localStorage.setItem(key, JSON.stringify(data));
// };

// export const dbGetAll = (key) => {
//   return read(key);
// };

// export const dbStore = (key, data) => {
//   data.id = uuid();
//   write(key, [...read(key), data]);
// };

// export const dbUpdate = (key, data, id) => {
//   return read(key).map((d) => (d.id === id ? { ...d, ...data, id: d.id } : { ...d }));
// };

// export const dbDelete = (key, id) => {
//   return read(key).filter((d) => d.id !== id);
// };
