// rafce = ket react fomat
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Row, Col } from "react-bootstrap";

// Function
import {
  getUserCart,
  saveAddress,
  saveOrder,
  emptyCart,
} from "../function/users";

// Toastify
import { toast } from "react-toastify";

const Payment = () => {
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState({
    name: "",
    surname: "",
    phone: "",
    houseNumber: "",
    subdistrict: "",
    district: "",
    province: "",
    zipcode: "",
  });
  const [addressSaved, setAddressSaved] = useState(false);

  useEffect(() => {
    getUserCart(user.token)
      .then((res) => {
        console.log(res.data);
        setProducts(res.data.products);
        setTotal(res.data.cartTotal);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user.token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const handleSaveAddress = (e) => {
    e.preventDefault();
    // Check if all fields are filled
    if (
      !address.name ||
      !address.surname ||
      !address.phone ||
      !address.houseNumber ||
      !address.subdistrict ||
      !address.district ||
      !address.province ||
      !address.zipcode
    ) {
      toast.error("กรุณากรอกข้อมูลที่อยู่ให้ครบถ้วน");
      return;
    }
    console.log("address: ", address);
    saveAddress(user.token, address)
      .then((res) => {
        console.log(res.data);
        if (res.data.ok) {
          toast.success("บันทึกที่อยู่สำเร็จ");
          setAddressSaved(true);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("เกิดข้อผิดพลาดในการบันทึกที่อยู่");
      });
  };

  const handleCreateOrder = () => {
    saveOrder(user.token).then((res) => {
      console.log(res.data);

      // clear DB
      emptyCart(user.token);

      // clear store
      dispatch({
        type: "ADD_TO_CART",
        payload: [],
      });

      // clear localStorage
      if (typeof window !== "undefined") localStorage.removeItem("cart");

      toast.success("บันทึกข้อมูลสำเร็จ");
      navigate("/user/history");
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 mt-4 ">
          <h3>ที่อยู่จัดส่ง</h3>

          <Form onSubmit={handleSaveAddress}>
            <Row className="mb-4 mt-4">
              <Col md={6}>
                <Form.Group controlId="formName">
                  <Form.Control
                    type="text"
                    name="name"
                    onChange={handleChange}
                    placeholder="ชื่อ"
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="formSurname">
                  <Form.Control
                    type="text"
                    name="surname"
                    onChange={handleChange}
                    placeholder="นามสกุล"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={12}>
                <Form.Group controlId="formHouseNumber">
                  <Form.Control
                    as="textarea"
                    name="houseNumber"
                    onChange={handleChange}
                    placeholder="บ้านเลขที่/หมู่/ซอย/ถนน"
                    required
                    style={{
                      height: "100px",
                      textAlign: "left",
                      verticalAlign: "top",
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={6}>
                <Form.Group controlId="formSubdistrict">
                  <Form.Control
                    type="text"
                    name="subdistrict"
                    onChange={handleChange}
                    placeholder="ตำบล"
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="formDistrict">
                  <Form.Control
                    type="text"
                    name="district"
                    onChange={handleChange}
                    placeholder="อำเภอ"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={6}>
                <Form.Group controlId="formProvince">
                  <Form.Control
                    type="text"
                    name="province"
                    onChange={handleChange}
                    placeholder="จังหวัด"
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="formZipcode">
                  <Form.Control
                    type="text"
                    name="zipcode"
                    onChange={handleChange}
                    placeholder="รหัสไปรษณีย์"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group controlId="formPhone">
                  <Form.Control
                    type="text"
                    name="phone"
                    onChange={handleChange}
                    placeholder="เบอร์โทร"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="d-flex justify-content-center">
              <Button variant="success" type="submit" className="mt-3 w-50">
                บันทึก
              </Button>
            </div>
          </Form>
        </div>

        <div className="col-md-4 mt-4">
          <div class="col">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title">ยอดคำสั่งซื้อ</h4>
                <hr />
                <div>
                  <div className="col text-start">รายการ</div>
                  {cart.map((item, index) => (
                    <>
                        <div
                          key={index}
                          className="d-flex align-items-center"
                        >
                          <img
                            src={item.images[0].url}
                            width="100"
                            height="auto"
                          />
                          {item.title} x {item.count}
                        </div>
                    </>
                  ))}
                </div>
                <hr />

                <div class="card-text row mb-2">
                  <div className="col text-start">ราคา</div>
                  <div className="col text-end">{total} บาท</div>
                </div>

                <div class="card-text row mb-4">
                  <div className="col text-start">ค่าจัดส่ง</div>
                  <div className="col text-end">ฟรี</div>
                </div>
                
                <hr />
                <div class="card-text row">
                  <div className="col text-start">
                    <b>ยอดรวมทั้งหมด</b>
                  </div>
                  <div className="col text-end">
                    <b>{total} บาท</b>
                  </div>
                </div>

                <div class="card-text row mt-4">
                  <div className="col">
                    <button
                      className="btn btn-dark d-flex justify-content-center w-100"
                      onClick={handleCreateOrder}
                      disabled={!addressSaved}
                    >
                      ยืนยันการสั่งซื้อ
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
