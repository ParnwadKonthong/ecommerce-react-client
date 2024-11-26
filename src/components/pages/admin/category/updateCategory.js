// rafce = key react fomat
import React, { useState, useEffect } from "react";

// Function
import { readCategory, editCategory } from "../../../function/category";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// redux
import { useSelector } from "react-redux";

const UpdateCategory = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const navigate = useNavigate();
  const params = useParams();

  const [name, setName] = useState("");
  useEffect(() => {
    loadData(user.token, params.id);
  }, []);

  const loadData = (authtoken, id) => {
    readCategory(authtoken, id)
      .then((res) => {
        setName(res.data.name);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editCategory(user.token, params.id, { name })
      .then((res) => {
        navigate("/admin/createCategory");
        toast.success("Update " + res.data.name + " success");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error!! update");
      });
  };

  return (
    <div className="container">
      <h1 className="text-center">Update Page</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Update Category</label>
          <input
            className="form-control"
            value={name}
            autoFocus 
            required
            onChange={(e) => setName(e.target.value)}
          ></input>
          <button className="btn btn-outline-success">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateCategory;
