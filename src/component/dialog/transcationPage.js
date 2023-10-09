/* eslint-disable no-mixed-operators */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Toast } from "../../util/Toast";
// routing
import { Link, useHistory } from "react-router-dom";

// redux
import { connect, useSelector } from "react-redux";

import TImage from "../../assets/images/trans01.png"


import { $ } from "jquery";
import { baseURL } from "../../util/Config";



const TransectionPage = () => {

  const [trans, setTrans] = useState([])
  const [deletedTrans, setDeletedTrans] = useState(null)


  useEffect(()=>{
    fetch(baseURL+"transecPending/getTransecPendings")
      .then(data => data.json())
      .then(json => setTrans(json?.transecPendings))
  },[deletedTrans])


  const handleTransStatus=(id,status)=>{
    axios.put(`/transecPending/updateTransecPending/${id}`,{status}).then((res)=>{
      console.log('response',res);
      setDeletedTrans(id)
    }).catch((error)=>{
      Toast("error", error.message);
    })
  }

  const handleDeleteTrans=(id)=>{
    console.log('id is', id);
    axios.delete(`/transecPending/deleteTransecPending/${id}`)
    .then((res)=>{
      console.log('response',res);
      setDeletedTrans(id)
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
            <h3 className="mb-3 text-light">Transection</h3>
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
                  <Link to="/admin/transcation" className="text-danger">
                  Transection
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
                  <li className="table-w-1">Transaction ID</li>
                  <li className="table-w-1">Total Amount</li>
                  <li className="table-w-1">Payment Screen shot</li>
                  <li className="table-w-1">Delete</li>
                  <li className="table-w-1">Action</li>
                </ul>

                { trans.map(item=><ul key={item?._id} className="table_tran">
                  <li className="table-w-1">{item?.transectionId}</li>
                  <li className="table-w-1">BDT {item?.totalAmount}</li>
                  <li className="table-w-1">
                    <img src={`${baseURL}${item?.payment_ss}`} height={60} width={120}/>
                  </li>
                  <li className="table-w-1"><button onClick={()=>{handleDeleteTrans(item?._id)}} className="tran_btn">Delete</button></li>
                  <li className="action_table table-w-1">
                    <button disabled={item.status != "false" && item.status != "rejected"} onClick={()=>{handleTransStatus(item?._id,"true")}} className="tran_btn_ap">{item.status == "false" ? "Approve" : item.status == "rejected"?"canceled":"Approved"} </button>
                    {item.status == "false" ? <button onClick={()=>{handleTransStatus(item?._id,"rejected")}} className="tran_btn_re">Reject</button> : ""}
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
  TransectionPage,
})(TransectionPage);
