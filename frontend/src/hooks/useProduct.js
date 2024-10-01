import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';

// A custom hook to fetch products data
const useProduct = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance({
          method: 'GET',
          url: '/product/getproducts',
        });
        setProduct(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  return { product, loading, error };
};

export default useProduct;
