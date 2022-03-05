import { httpClient } from "../httpClient";

export const GetList = (schemas) => {
  return httpClient
    .get(schemas)
    .then((response) => {
      return response.data || response.data || response.response.data;
    })
    .catch((err) => {
      return err.data;
    });
};

export const GetByID = (schemas, id) => {
  return httpClient
    .get(`${schemas}/${id}`)
    .then((response) => {
      return response.data || response.data || response.response.data;
    })
    .catch((err) => {
      return err.data;
    });
};

export const BuyProduct = (schemas, id) => {
  return httpClient
    .put(`${schemas}/${id}`)
    .then((response) => {
      return response.data || response.data || response.response.data;
    })
    .catch((err) => {
      return err.data;
    });
};
