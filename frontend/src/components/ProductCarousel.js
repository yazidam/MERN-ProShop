import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";

import { listTopProducts } from "../actions/producutActions";
const ProductCarousel = () => {
  const dispatch = useDispatch();
  const productTopRated = useSelector((state) => state.productTopRated);
  const { products, loading, error } = productTopRated;
  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel
      pause="hover"
      className="bg-dark my-5"
      style={{
        backgroundColor: "#ced1d3",
        borderRadius: "30px",
        boxShadow: "12px 12px 22px grey",
      }}
    >
      {products.map((pro) => (
        <Carousel.Item key={pro._id}>
          <Link to={`/product/${pro._id}`}>
            <Image src={pro.image} alt={pro.name} fluid />
            <Carousel.Caption className="carousel-caption">
              <h2>
                {pro.name} ({pro.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
