// rafce = key react fomat
import React, { useState } from "react";
// function
import { login } from "../../function/auth";
// redux
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
// react-toastify
import { toast } from "react-toastify";
// Link
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const roleBaseRedirect = (role) => {
    let intended = location.state;
    if (intended) {
      navigate("../" + intended);
    } else {
      if (role === "admin") {
        navigate("/admin/home");
      } else {
        navigate("/");
      }
    }
  };

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    login(value)
      .then((res) => {
        setLoading(false);
        toast.success(res.data.payload.user.username + " เข้าสู่ระบบสำเร็จ");
        dispatch({
          type: "LOGIN",
          payload: {
            token: res.data.token,
            email: res.data.payload.user.email,
            username: res.data.payload.user.username,
            role: res.data.payload.user.role,
          },
        });

        localStorage.setItem("token", res.data.token);
        roleBaseRedirect(res.data.payload.user.role);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data);
      });
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 text-center">
          {loading ? <h1>Loading...</h1> : <h1 className="pb-5">เข้าสู่ระบบเพื่อซื้อสินค้า</h1>}
          <form onSubmit={handleSubmit}>
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

            <div className="d-grid gap-2 pt-2">
              <button className="btn btn-dark">เข้าสู่ระบบ</button>
            </div>

            <div className="pt-5">
              <p>
                คุณยังไม่มีสมาชิกใช่หรือไม่? <Link to="/register">สมัครสมาชิกที่นี้</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
