// rafce = key react fomat
import React from "react";
import Resize from "react-image-file-resizer";
import { useSelector } from "react-redux";
import axios from "axios";

// Boostap
import { Image } from "react-bootstrap";

const FileUpload = ({ values, setValues, loading, setLoading }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const handleChangFile = (e) => {
    const files = e.target.files;
    if (files) {
      setLoading(true);
      let allFileUpload = values.images; //array
      for (let i = 0; i < files.length; i++) {
        Resize.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            axios
              .post(
                process.env.REACT_APP_API + "/images",
                {
                  image: uri,
                },
                {
                  headers: {
                    authtoken: user.token,
                  },
                }
              )
              .then((res) => {
                setLoading(false);
                allFileUpload.push(res.data);
                console.log("allfile", allFileUpload);
                setValues({ ...values, images: allFileUpload });
              })
              .catch((err) => {
                console.log(err);
              });
          },
          "base64"
        );
      }
    }
  };

  const handleRemove = (public_id) => {
    setLoading(true);
    const { images } = values;
    axios
      .post(
        process.env.REACT_APP_API + "/removeimages",
        { public_id },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        let filterImages = images.filter((item) => {
          return item.public_id !== public_id;
        });
        setValues({ ...values, images: filterImages });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <>
      <br />
      <div className="d-flex flex-wrap justify-content-start">
        {values.images &&
          values.images.map((item) => (
            <div key={item.public_id} className="position-relative">
              <Image
                src={item.url}
                rounded
                className="m-2"
                style={{ width: "120px", height: "120px" }}
              />
              <span
                className="position-absolute translate-middle badge rounded-pill bg-danger"
                style={{ cursor: "pointer" }}
                onClick={() => handleRemove(item.public_id)}
              >
                x
              </span>
            </div>
          ))}
      </div>
      <br />
      <div className="form-group">
        {loading ? (
          <span>Loading...</span> //true
        ) : (
          <label
            className="btn btn-secondary d-flex align-items-center"
            style={{
              width: "130px", // ความยาวจะตามขนาดเนื้อหาภายใน
            }}
          >
            <span className="material-icons me-1">attach_file</span>
            แนบไฟล์รูป
            <input
              className="form-control"
              onChange={handleChangFile}
              type="file"
              hidden
              multiple
              accept="images/*"
              name="file"
            />
          </label>
        )}
      </div>
      <br />
    </>
  );
};

export default FileUpload;
