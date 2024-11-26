// rafce = key react fomat
import React, { useState, useEffect } from "react";
// Function
import {
  createCategory,
  listCategory,
  deleteCategory,
  readCategory,
  editCategory,
} from "../../../function/category";
// redux
import { useSelector } from "react-redux";
// notification
import { toast } from "react-toastify";
// Boostap
import { Button, Modal, Table, Form } from "react-bootstrap";

const CreateCategory = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null); // เก็บ ID ที่จะแก้ไข
  const [editCategoryName, setEditCategoryName] = useState(""); // เก็บชื่อที่จะแก้ไข
  const [values, setValues] = useState({
    name: "",
  });

  const [category, setCategory] = useState([]);

  useEffect(() => {
    loadData(user.token);
  }, []);

  const loadData = (authtoken) => {
    listCategory(authtoken)
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (id) => {
    deleteCategory(user.token, id)
      .then((res) => {
        console.log(res);
        loadData(user.token);
        toast.success("Remove category" + res.data.name + " success");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error!! Remove category");
      });
  };

  const handleChangeCategory = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createCategory(user.token, values)
      .then((res) => {
        console.log(res);
        loadData(user.token);
        toast.success("Add category " + res.data.name + " success");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error!! Add category");
      });
  };

  const showModal = (id, name) => {
    setEditCategoryId(id);
    setEditCategoryName(name);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditCategoryId(null);
    setEditCategoryName("");
  };


  const handleEditCategory = (e) => {
    e.preventDefault();
    console.log(editCategoryName)
    editCategory(user.token, editCategoryId, { name: editCategoryName })
      .then((res) => {

        setIsModalOpen(false);
        loadData(user.token);
        toast.success("แก้ไขหมวดหมู่ " + res.data.name + " สำเร็จ");
      })
      .catch((err) => {
        console.log(err);
        toast.error("เกิดข้อผิดพลาดในการแก้ไขหมวดหมู่");
      });
  };
  

  return (
    <div className="container">
      <div className="col-md-6 offset-md-3 text-center">
        <h1 className="text-center m-4">ประเภทสินค้า🛠️</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group p-5">
            <div class="input-group mb-3">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="ประเภท"
                value={values.name}
                onChange={handleChangeCategory}
              />
              <button
                className="btn btn-dark "
                type="submit"
                style={{ width: "200px" }}
              >
                เพิ่ม
              </button>
            </div>
          </div>
        </form>
        <hr />
        <ul className="list-group">
          {category.map((item) => (
            <li className="list-group-item">
              {item.name}
              <button
                style={{
                  float: "right",
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "not-allowed",
                  color: "#FF9999",
                }}
                className="material-icons me-1"
                // onClick={() => handleDelete(item._id)}
                disabled
              >
                delete
              </button>
              <button
                style={{
                  float: "right",
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  color: "blue",
                }}
                className="material-icons me-1"
                onClick={() => showModal(item._id)}
              >
                <span className="material-icons">edit</span>
                {/* <Link to={`/admin/update-category/${item._id}`}>edit</Link> */}
              </button>
            </li>
          ))}
        </ul>

        <Modal show={isModalOpen} onHide={handleCancel}>
          <Modal.Header closeButton>
            <Modal.Title>แก้ไขประเภท</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formEditCategory">
              <Form.Control
                type="text"
                name="password"
                value={editCategoryName}
                placeholder="เปลี่ยนชื่อประเภท"
                onChange={(e) => setEditCategoryName(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCancel}>
              ยกเลิก
            </Button>
            <Button variant="success" onClick={handleEditCategory} disabled={editCategoryName===undefined}>
              บันทึก
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default CreateCategory;
