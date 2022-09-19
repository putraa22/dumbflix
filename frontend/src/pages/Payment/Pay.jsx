import React from "react";
import "./Pay.scss";
import {AttachFile} from '@mui/icons-material'

const Pay = () => {
  return (
    <div className="app__payment">
      <div className="app__wrapper-payment">
        <h1>Premium</h1>
        <div className="app__payment-content">
          <p className="app__payment-desc">
            Bayar sekarang dan nikmati streaming film-film yang kekinian dari <span>DUMBFLIX</span> <br />
            <span>DUMBFLIX</span> : 0981312323
          </p>
          <div className="app__payment-form">
            <input className="input-number" type="number" placeholder="Input your account number" />
            {/* <div className="input-file"> */}
            <label htmlFor="label">Attache proof of transfer <AttachFile/> </label>
            <input id="label" className="input-file" type="file" placeholder="Attach proof of transfer" />
            {/* </div> */}
            <button>Kirim</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pay;
