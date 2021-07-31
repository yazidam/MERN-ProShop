import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getUserdetails, updateUserProfile } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";
const ProfileScreen = ({ location, history }) => {
  const [email, setEmail] = useState(""); // default empty string ('')
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMassage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails); // njibo fih men store
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin); // njibo fih men store
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile); // njibo fih men store
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy); // njibo fih men store
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.name) {
        dispatch(getUserdetails("profile"));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      setMassage("password do not match");
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
    // history.push(redirect);
  };
  return (
    <Row>
      <Col md={3}>
        <h2> User Profile</h2>
        {error && <h2>verifier votre coordonner {error}</h2>}
        {success && <h2 variant="danger">Profile Updated</h2>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name </Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password Address</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="confirmpassword">
            <Form.Label>Confirm Password </Form.Label>
            <Form.Control
              type="password"
              placeholder="confirm password"
              value={confirmpassword}
              onChange={(e) => setConfirmpassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            className="my-3 "
            // disabled={email.length < 10}
          >
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Oreders</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant="dabger">{errorOrders}</Message>
        ) : (
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTALE</th>
                <th>PAID</th>
                <th>DELIVERD</th>
                <th>dd</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((orderr) => (
                <tr key={orderr._id}>
                  <td>{orderr._id}</td>
                  <td>{orderr.createdAt.substring(0, 10)}</td>
                  <td>{orderr.totalPrice}</td>
                  <td>
                    {orderr.isPaid ? (
                      orderr.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>

                  <td>
                    {orderr.isDelivered ? (
                      orderr.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${orderr._id}`}>
                      <Button className="btn-sm" variant="light">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
