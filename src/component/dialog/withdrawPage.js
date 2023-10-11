/* eslint-disable no-mixed-operators */
import React, { useEffect, useState } from "react";

// routing
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { Toast } from "../../util/Toast";
// redux
import { connect, useSelector } from "react-redux";

import TImage from "../../assets/images/trans01.png"


import { $ } from "jquery";
import { baseURL } from "../../util/Config";

const WithdrawPage = () => {

  
  const [trans, setTrans] = useState([])
  const [deletedTransWithdraw, setDeletedTransWithdraw] = useState(null)

  useEffect(()=>{
    fetch(baseURL+"transecWithdraw")
      .then(data => data.json())
      .then(json => setTrans(json))
  },[deletedTransWithdraw])

  const handleTransWithdrawStatus = (id,status) => {
    axios.put(`/transecWithdraw/${id}`,{status}).then((res)=>{
      console.log('response',res);
      setDeletedTransWithdraw(id)
    }).catch((error)=>{
      Toast("error", error.message);
    })
  }

  const handleDeleteTransWithdraw = (id) => {
    axios.delete(`/transecWithdraw/${id}`)
    .then((res)=>{
      console.log('response',res);
      setDeletedTransWithdraw(id)
    })
    .catch((error)=>{
        Toast("error", error.message);
    })
  }

  


  return (
    <>
      <div className="page-title">
        <div className="row">
          <div className="col-12 col-md-6 order-md-1 order-last">
            <h3 className="mb-3 text-light">Redeem Payment with Bkash</h3>
          </div>
          <div className="col-12 col-md-6 order-md-2 order-first">
            <nav
              aria-label="breadcrumb"
              className="breadcrumb-header float-start float-lg-end"
            >
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/admin/dashboard" className="text-danger">
                    Dashboard
                  </Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/admin/withdraw" className="text-danger">
                  withdraw
                  </Link>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-body card-overflow">
              <div className="d-sm-flex align-items-center justify-content-between mb-4"></div>

              <div className="full_box_tran">
                <ul className="table_tran">
                  <li className="table-w-1">Bkash Number</li>
                  <li className="table-w-1">Bkash Number type</li>
                  <li className="table-w-1">Amount</li>
                  <li className="table-w-1">Delete</li>
                  <li className="table-w-1">Action</li>
                </ul>

            
                   { trans?.TransecWithdraws?.map(item=><ul key={item?._id} className="table_tran">
                  <li className="table-w-1">{item.bkashNumber}</li>
                  <li className="table-w-1">{item.bkashType}</li>
                  <li className="table-w-1">BDT {item.amount}</li>
                  <li className="table-w-1"><button onClick={()=>{handleDeleteTransWithdraw(item?._id)}} className="tran_btn">Delete</button></li>
                  <li className="action_table table-w-1">
                  <button disabled={item.status != "false" && item.status != "rejected"} onClick={()=>{handleTransWithdrawStatus(item?._id,"true")}} className="tran_btn_ap">{item.status == "false" ? "Approve" : item.status == "rejected"?"canceled":"Approved"} </button>
                    {item.status == "false" ? <button onClick={()=>{handleTransWithdrawStatus(item?._id,"rejected")}} className="tran_btn_re">Reject</button> : ""}
                  </li>
                  </ul>)
                }
                  
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(null, {
  WithdrawPage,
})(WithdrawPage);
