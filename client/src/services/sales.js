import api from './api-config';

export const getAllSales = async () => {
  const resp = await api.get('/sales');
  return resp.data;
};

export const getOneSale = async (id) => {
  const resp = await api.get(`/sales/${id}`);
  return resp.data;
};

export const postSale = async (saleData) => {
  const resp = await api.post('/sales', { sale: saleData });
  return resp.data;
};

export const putSale = async (id, saleData) => {
  const resp = await api.put(`/sales/${id}`, { sale: saleData });
  return resp.data;
};

export const deleteSale = async (id) => {
  const resp = await api.delete(`/sales/${id}`);
  return resp;
};