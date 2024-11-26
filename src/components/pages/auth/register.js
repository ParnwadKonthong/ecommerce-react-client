// rafce = key react fomat
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// function
import { register } from "../../function/auth";
// react-toastify
import { toast } from "react-toastify";
// Link
import { Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.password !== value.confirmPassword) {
      toast.error("รหัสผ่านไม่ตรงกัน !");
    } else {
      register(value)
        .then((res) => {
          toast.success(res.data);
          navigate("/login");
        })
        .catch((err) => {
          toast.error(err.response.data);
        });
    }
  };

  const isFormValid =
    value.username &&
    value.email &&
    value.password &&
    value.confirmPassword;
    

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 text-center">
          <h1 className="pb-5">สมัครสมาชิก</h1>

          <form onSubmit={handleSubmit}>
            
            <div className="form-group">
              <input
                className="form-control "
                type="text"
                name="username"
                placeholder="ชื่อผู้ใช้"
                onChange={handleChange}
              />
              <br />
            </div>

            <div className="form-group">
              <input
                className="form-control"
                type="email"
                name="email"
                placeholder="อีเมล"
                onChange={handleChange}
              />
              <br />
            </div>

            <div className="form-group">
              <input
                className="form-control"
                type="password"
                name="password"
                placeholder="รหัสผ่าน"
                onChange={handleChange}
              />
              <br />
            </div>

            <div className="form-group">
              <input
                className="form-control"
                type="password"
                name="confirmPassword"
                placeholder="ยืนยันรหัสผ่าน"
                onChange={handleChange}
              />
              <br />
            </div>

            <div className="d-grid gap-2 pt-2">
              <button
                className="btn btn-dark"
                disabled={!isFormValid}
              >
                สมัคร
              </button>
            </div>

            <div className="pt-5">
              <p>
                เป็นสมาชิกแล้ว <Link to="/login">เข้าสู่ระบบ</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
