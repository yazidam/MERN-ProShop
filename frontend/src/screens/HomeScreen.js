import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/producutActions';
import { Row, Col } from 'react-bootstrap';
// import products from '../products';
// import axios from 'axios';
import Product from '../components/Product';
import Loader from '../components/Loader';
const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  // const [products, setProducts] = useState([]);
  useEffect(() => {
    dispatch(listProducts());
    // const fetechProduct = async () => {
    //   const { data } = await axios.get('/api/products');
    //   setProducts(data);
    // };
    // fetechProduct();
  }, [dispatch]);

  return (
    <>
      <h1>Lates products</h1>
      {loading ? (
        <Loader />
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
