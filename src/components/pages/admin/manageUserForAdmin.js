// rafce = key react fomat
import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import moment from "moment";

// functions
import {
  listUser,
  changeStatus,
  changeRole,
  removeUser,
  changePassword,
} from "../../function/users";
// Boostap
import { Button, Modal, Table, Form } from "react-bootstrap";

const ManageUserForAdmin = () => {
  const { user } = useSelector((state) => ({ ...state }));

  // ข้อมูลในตารางต้นฉบับ
  const [data, setData] = useState([]);
  // ข้อมูลที่เลือก
  const [selectData, setSelectData] = useState([]);
  // ข้อมูลที่ใช้ loop ใน dropdown
  const [drop, setDrop] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [values, setValues] = useState({
    id: "",
    password: "",
  });

  const loadData = useCallback(
    (authtoken) => {
      listUser(authtoken)
        .then((res) => {
          setData(res.data);
          setSelectData(res.data);
          // [...new Set(array)]
          const dataDrop = [...new Set(res.data.map((item) => item.role))];
          setDrop(dataDrop);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
    [data]
  );

  const showModal = (id) => {
    setIsModalOpen(true);
    setValues({ ...values, id: id });
  };

  const handleChangePassword = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleOk = () => {
    setIsModalOpen(false);
    changePassword(user.token, values.id, { values })
      .then((res) => {
        console.log(res);
        loadData(user.token);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    loadData(user.token);
  }, []);

  const handleOnchange = (e, id) => {
    const value = {
      id: id,
      enabled: e,
    };
    changeStatus(user.token, value)
      .then((res) => {
        console.log(res);
        loadData(user.token);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const roleData = ["admin", "user"];
  const handleChangeRole = (e, id) => {
    let value = {
      id: id,
      role: e,
    };
    changeRole(user.token, value)
      .then((res) => {
        console.log(res);
        loadData(user.token);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleRemove = (id) => {
    if (window.confirm("Are you sure for delete?")) {
      removeUser(user.token, id)
        .then((res) => {
          console.log(res);
          loadData(user.token);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  };

  const handleSelectRole = (e) => {
    const value = e.target.value;
    if (value == "all") {
      setSelectData(data);
    } else {
      const filterData = data.filter((item, index) => {
        return item.role == value;
      });
      setSelectData(filterData);
    }
  };

  return (
    <div className="container-fluid">
      <h1 className="text-center mt-4 mb-3">การจัดการผู้ใช้🧑‍🧑‍🧒‍🧒</h1>
      <div className="row justify-content-center mb-3">
        <div className="col-12 col-sm-10 col-md-10 col-lg-8 col-xl-10">
          {/* Dropdown Filter */}
          <div className="text-center mb-4">
            <select
              className="form-select"
              onChange={(e) => handleSelectRole(e)}
              style={{
                width: "200px",
                margin: "0 auto",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "14px",
                padding: "10px",
              }}
            >
              <option value="all">All Roles</option>
              {drop.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Responsive Table */}
          <div className="table-responsive">
            <Table bordered hover className="align-middle">
              <thead className="table-light text-center">
                <tr>
                  <th>ชื่อผู้ใช้</th>
                  <th>อีเมล</th>
                  <th>สถานะ</th>
                  <th>การใช้งาน</th>
                  <th>วันที่สร้าง</th>
                  <th>เวลาที่อัปเดทล่าสุด</th>
                  <th>การจัดการ</th>
                </tr>
              </thead>
              <tbody>
                {selectData.map((item) => (
                  <tr key={item._id}>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td className="text-center">
                      <Form.Select
                        value={item.role}
                        onChange={(e) =>
                          handleChangeRole(e.target.value, item._id)
                        }
                        className="form-select"
                        style={{
                          width: "150px",
                          margin: "0 auto",
                          textAlign: "center",
                        }}
                      >
                        {roleData.map((role, index) => (
                          <option key={index} value={role}>
                            {role}
                          </option>
                        ))}
                      </Form.Select>
                    </td>
                    <td className="text-center">
                      <Form.Check
                        type="switch"
                        id={`switch-${item._id}`}
                        checked={item.enabled}
                        onChange={(e) =>
                          handleOnchange(e.target.checked, item._id)
                        }
                      />
                    </td>
                    <td>
                      {moment(item.createdAt).locale("th").format("DD-MM-YYYY")}
                    </td>
                    <td>{moment(item.updatedAt).locale("th").fromNow()}</td>
                    <td className="text-center">
                      <Button
                        variant="danger"
                        className="me-2"
                        // onClick={() => handleRemove(item._id)}
                        style={{
                          backgroundColor: "#FF9999",
                          borderColor: "#FF9999",
                          padding: "5px 10px",
                          cursor: "not-allowed",
                        }}
                      >
                        ลบ
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => showModal(item._id)}
                        style={{
                          backgroundColor: "#2196f3",
                          borderColor: "#2196f3",
                          padding: "5px 10px",
                        }}
                      >
                        แก้ไข
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {/* Modal */}
          <Modal show={isModalOpen} onHide={handleCancel}>
            <Modal.Header closeButton>
              <Modal.Title>เปลี่ยนรหัสผ่าน</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group controlId="formPassword">
                <Form.Control
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChangePassword}
                  placeholder="รหัสผ่านใหม่"
                  className="mb-3"
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCancel}>
                ยกเลิก
              </Button>
              <Button
                variant="success"
                onClick={handleOk}
                disabled={values.password === ""}
              >
                บันทึก
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default ManageUserForAdmin;
