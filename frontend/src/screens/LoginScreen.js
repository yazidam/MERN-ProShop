import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";
import { useTranslation } from "react-i18next";

const LoginScreen = ({ location, history }) => {
  const { t, i18n } = useTranslation();

  const [email, setEmail] = useState(""); // default empty string ('')
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin); // njibo fih men userreducer
  const { loading, error, userInfo } = userLogin;
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);
  // useEffect(()=>{
  //       if(userInfo){
  //           if(userInfo.isAdmin){
  //               history.push('/g')

  //           }else{
  //               history.push('/')

  //           }
  //       }

  //   },[history,userInfo])

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
    // history.push(redirect);
  };
  return (
    // <body style={{ backgroundColor: "red" }}>
    <FormContainer>
      <h1> {t("signIn-label")}</h1>
      {error && <h2>verifier votre coordonner {error}</h2>}
      {/* {error && <Message variant="danger">{error}</Message>} */}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
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
          <Form.Label>Password </Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          className="my-3 "
          disabled={email.length < 10}
        >
          Sign In
        </Button>

        <Row className="py-3">
          <Col>
            New Coustomer?{" "}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
            >
              Register
            </Link>
            <Link className="mx-3" to="/forgetpassword">
              Reset Password
            </Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
    // </body>
  );
};

export default LoginScreen;
