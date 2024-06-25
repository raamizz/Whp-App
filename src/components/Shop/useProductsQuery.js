import { useQuery } from 'react-query';

const useProductsQuery = () => {
  return useQuery('products', async () => {
    const response = await fetch('/api/products');
    return response.json();
  });
};