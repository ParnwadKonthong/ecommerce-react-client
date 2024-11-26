// rafce = key react fomat
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// Function
import { getOrders, updateStatusOrder } from "../../function/admin";
// Notify
import { toast } from "react-toastify";
import InvoiceJsPDF from "../../invoice/invoiceJsPDF";

const Orders = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    getOrders(user.token)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeStatus = (orderId, orderStatus) => {
    updateStatusOrder(user.token, orderId, orderStatus)
      .then((res) => {
        console.log(res.data);
        toast.success("Updated " + res.data.orderStatus + " Success");
        loadData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <div className="col">
        <div className="row">
          {orders.length === 0 ? (
            <h1
              className="text-center"
              style={{ marginTop: "100px", color: "gray" }}
            >
              ยังไม่มีคำสั่งซื้อ
            </h1>
          ) : (
            <>
              <h1 className="text-center mt-4">ประวัติการสั่งซื้อ📋🔍</h1>
              {orders.map((item) => (
                <div
                  key={item._id}
                  className="card m-3 shadow-sm"
                  style={{ borderRadius: "10px", border: "1px solid #ddd" }}
                >
                  <div className="card-body">
                    {/* Header */}
                    <p className="mb-3">
                      <span className="fw-bold text-success">สั่งซื้อโดย:</span>{" "}
                      <b>
                        {item.orderdBy
                          ? item.orderdBy.username
                          : "ไม่ทราบผู้สั่ง"}
                      </b>
                    </p>

                    {/* สถานะ */}
                    <div className="row align-items-center mb-3">
                      <label className="col-sm-2 col-form-label fw-bold">
                        สถานะ:
                      </label>
                      <div className="col-sm-4">
                        <select
                          value={item.orderStatus}
                          onChange={(e) =>
                            handleChangeStatus(item._id, e.target.value)
                          }
                          className="form-select"
                          style={{
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                            backgroundColor: "#f9f9f9",
                          }}
                        >
                          <option value="Not Process">รอดำเนินการ</option>
                          <option value="Processing">กำลังดำเนินการ</option>
                          <option value="Cancalled">ยกเลิก</option>
                          <option value="Completed">สำเร็จ</option>
                        </select>
                      </div>
                      <div className="col text-end">
                        <InvoiceJsPDF order={item}>Download PDF</InvoiceJsPDF>
                      </div>
                    </div>

                    {/* ตารางสินค้า */}
                    <table className="table table-bordered table-hover mt-4">
                      <thead className="table-light text-center">
                        <tr>
                          <th>ชื่อสินค้า</th>
                          <th>ราคา (บาท)</th>
                          <th>จำนวน</th>
                        </tr>
                      </thead>
                      <tbody>
                        {item.products.map((p) => (
                          <tr key={p._id}>
                            <td className="text-start ps-3">
                              {p.product.title}
                            </td>
                            <td className="text-end pe-3">{p.price}</td>
                            <td className="text-end pe-3">{p.count}</td>
                          </tr>
                        ))}
                        <tr className="table-light">
                          <td colSpan={3} className="text-end pe-3">
                            <span className="fw-bold">ยอดรวม:</span>{" "}
                            <b className="text-danger">{item.cartTotal} บาท</b>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
