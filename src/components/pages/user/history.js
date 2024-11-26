// rafce = key react fomat
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// Function
import { getOrders } from "../../function/users";
// Invoice
import InvoiceJsPDF from "../../invoice/invoiceJsPDF";

const History = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadDate();
  }, []);

  const loadDate = () => {
    getOrders(user.token)
      .then((res) => {
        setOrders(res.data);
        console.log(res);
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
              <h3 className="mt-4">ประวัติการสั่งซื้อ📋🔍</h3>
              {orders.map((item, index) => (
                <div
                  key={index}
                  className="card m-3 shadow-sm"
                  style={{ borderRadius: "10px", border: "1px solid #ddd" }}
                >
                  <div className="card-body">
                    <div className="row align-content-center">
                      {/* Order Status */}
                      <div className="col fw-bold text-primary">
                        Order Status:{" "}
                        <span className="text-uppercase">
                          {item.orderStatus}
                        </span>
                      </div>
                      <div className="col text-end">
                        <InvoiceJsPDF order={item}>Download PDF</InvoiceJsPDF>
                      </div>
                    </div>

                    {/* Table */}
                    <table className="table table-bordered mt-3">
                      <thead className="table-light text-center">
                        <tr>
                          <th>Title</th>
                          <th>Price</th>
                          <th>Count</th>
                        </tr>
                      </thead>
                      <tbody>
                        {item.products.map((p, i) => (
                          <tr key={i}>
                            <td className="text-start ps-3">
                              {p.product.title}
                            </td>
                            <td className="text-end pe-3">{p.price}</td>
                            <td className="text-end pe-3">{p.count}</td>
                          </tr>
                        ))}
                        <tr className="table-light">
                          <td colSpan={3} className="text-end pe-3">
                            <span className="fw-bold">Total:</span>{" "}
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

export default History;
