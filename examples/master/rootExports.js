let data = {
  count: 0,
};

export function getData() {
  return data;
}

export function setData(newData) {
  data = {
    ...data,
    ...newData,
  };
}
