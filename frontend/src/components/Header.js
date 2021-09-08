// import React from 'react';
// import { Container, Nav, Navbar } from 'react-bootstrap';

// const Header = () => {
//   return (
//     <header>
//       <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
//         <Container>
//           <Navbar.Brand href="/">proshop</Navbar.Brand>
//           <Navbar.Toggle aria-controls="basic-navbar-nav" />
//           <Navbar.Collapse id="basic-navbar-nav">
//             <Nav className="margin: auto">
//               <Nav.Link href="/cart">Cart</Nav.Link>
//               <Nav.Link href="/login">Sign in</Nav.Link>
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//     </header>
//   );
// };

// export default Header;
import React from "react";
import { Route } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import { useHistory } from "react-router-dom";
import SeachBox from "./SeachBox";
import { useTranslation } from "react-i18next";
// call action usedispatche
// get somthing useselector
import "../styles/nav.css";
const Header = () => {
  const { t, i18n } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const logoutHandler = () => {
    dispatch(logout());
    history.push("/login");
  };
  const changeLanguageHandler = (e) => {
    const languageValue = e.target.value;
    i18n.changeLanguage(languageValue);
    // i18n.changeLanguage(languageValue);
  };
  return (
    <header className="navbarr">
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>ProShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Route render={({ history }) => <SeachBox history={history} />} />
            <Nav className=" navbar-collapse justify-content-end">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    LOGOUT
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <i className="fas fa-user"></i> Sign In
                    </Nav.Link>
                  </LinkContainer>
                  <select
                    className="form-select form-select-sm width-90"
                    style={{
                      cursor: "pointer",
                      width: "104px",
                      borderRadius: "10px",
                      color: "orange",
                    }}
                    title="Lang"
                    // style={{ width: "-15px" }}
                    onChange={changeLanguageHandler}
                  >
                    {/* <LinkContainer> */}
                    <option>en</option>

                    <option>fr</option>
                    {/* </LinkContainer> */}
                    {/* <LinkContainer> */}
                    {/* </LinkContainer> */}
                  </select>
                </>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/productslist">
                    <NavDropdown.Item>Product</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/stat">
                    <NavDropdown.Item>Stats</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/map">
                    <NavDropdown.Item>Map</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
