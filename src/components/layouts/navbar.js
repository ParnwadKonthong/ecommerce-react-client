// rafce = ket react fomat
import React from "react";

// Router
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Boostap
import { Navbar, Nav, NavDropdown, Badge } from "react-bootstrap";
import Search from "../card/search";

// redux
const NavbarComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, cart, favorites } = useSelector((state) => ({ ...state }));

  const logout = () => {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    navigate("/");
  };

  return (
    <Navbar bg="light" expand="lg" className="px-1">
      <Navbar.Brand
        as={Link}
        to={user && user.role === "admin" ? "/admin/home" : "/"}
        className="d-flex ms-3"
      >
        <b>PARnWad</b>
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          {!user ? (
            <div className="d-flex ms-3 flex-column flex-lg-row">
              <Nav.Link
                as={Link}
                to="/allproduct"
                className="d-flex align-items-center"
              >
                <span className="me-1"></span>สินค้าทั้งหมด
              </Nav.Link>

              <Search />

              <Nav.Link
                as={Link}
                to="/cart"
                className="d-flex align-items-center "
              >
                <span className="material-icons me-1 ">shopping_bag</span>
                <Badge
                  pill
                  bg="danger"
                  className="top-0 start-100 translate-middle"
                >
                  {cart.length}
                </Badge>
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/login"
                className="d-flex align-items-center"
              >
                <span className="material-icons me-1">person</span>เข้าสู่ระบบ
              </Nav.Link>
            </div>
          ) : (
            <div>
              {user.role === "admin" && (
                <div className="d-flex ms-3 flex-column flex-lg-row">
                  <Nav.Link
                    as={Link}
                    to="/admin/home"
                    className="d-flex align-items-center"
                  >
                    <span className="me-1"></span>สินค้าทั้งหมด
                  </Nav.Link>

                  <Nav.Link
                    as={Link}
                    to="/admin/manage"
                    className="d-flex align-items-center"
                  >
                    <span className="me-1"></span>การจัดการ
                  </Nav.Link>

                  <Nav.Link
                    as={Link}
                    to="/admin/create-category"
                    className="d-flex align-items-center"
                  >
                    <span className="me-1"></span>ประเภทสินค้า
                  </Nav.Link>

                  <Nav.Link
                    as={Link}
                    to="/admin/orders"
                    className="d-flex align-items-center"
                  >
                    <span className="me-1"></span>คำสั่งซื้อ
                  </Nav.Link>

                  <NavDropdown
                    title={user.username}
                    id="basic-nav-dropdown"
                    align="end"
                  >
                    <NavDropdown.Item
                      onClick={logout}
                      className="d-flex align-items-center"
                    >
                      <span className="material-icons me-1">logout</span>
                      ออกจากระบบ
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>
              )}
              {user.role === "user" && (
                <div className="d-flex ms-3 flex-column flex-lg-row">
                  <Nav.Link
                    as={Link}
                    to="/allproduct"
                    className="d-flex align-items-center"
                  >
                    <span className="me-1"></span>สินค้าทั้งหมด
                  </Nav.Link>

                  <Search />

                  <Nav.Link
                    as={Link}
                    to="/cart"
                    className="d-flex align-items-center "
                  >
                    <span className="material-icons me-1 ">shopping_bag</span>
                    <Badge
                      pill
                      bg="danger"
                      className="top-0 start-100 translate-middle"
                    >
                      {cart.length}
                    </Badge>
                  </Nav.Link>

                  <NavDropdown
                    title={user.username}
                    id="basic-nav-dropdown"
                    align="end"
                  >
                    <NavDropdown.Item className="d-flex align-items-center">
                      <Link
                        to="/user/favorites"
                        className="d-flex align-items-center"
                        style={{ color: "black", textDecoration: "none" }}
                      >
                        <span className="material-icons me-1">favorite</span>
                        รายการโปรด
                      </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item className="d-flex align-items-center">
                      <Link
                        to="/user/history"
                        className="d-flex align-items-center"
                        style={{ color: "black", textDecoration: "none" }}
                      >
                        <span className="material-icons me-1">history</span>
                        ประการสั่งซื้อ
                      </Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item
                      onClick={logout}
                      className="d-flex align-items-center"
                    >
                      <span className="material-icons me-1">logout</span>
                      ออกจากระบบ
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>
              )}
            </div>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
