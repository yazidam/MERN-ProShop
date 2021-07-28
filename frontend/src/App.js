import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";
import NewPassword from "./screens/NewPassword";
import ShippingScreen from "./screens/ShippingScreen";

function App() {
  return (
    <Router>
      <Header />
      <main className="mx-3">
        <Container>
          <Route path="/shipping" component={ShippingScreen} />

          <Route path="/new_password/:token" component={NewPassword} />
          <Route path="/forgetpassword" component={ResetPasswordScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />

          <Route path="/" component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
