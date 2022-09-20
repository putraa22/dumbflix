import React, { useContext, useEffect } from "react";
import "./Pay.scss";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { AttachFile } from "@mui/icons-material";
import { useMutation } from "react-query";
import { API } from "../../config/api";

const Pay = () => {
  const [state] = useContext(UserContext);
  console.log(state);

  let navigate = useNavigate();

  useEffect(() => {
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    const myMidtransClientKey = "SB-Mid-client-6rIJeFk4bVD0qfHX";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  const handleBuy = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          methode: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      };

      const response = await API.post("/transaction", config);
      console.log(response);

      const token = response.data.data.token;

      window.snap.pay(token, {
        onSuccess: function (result) {
          navigate("/profile");
        },
        onPending: function (result) {
          navigate("/profile");
        },
        onError: function (result) {
          /* You may add your own implementation here */
        },
        onClose: function () {
          alert("You closed the popup without finishing the payment");
        },
      });
    } catch (error) {
      console.log(error);
    }
  });

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
            <label htmlFor="label">
              Attache proof of transfer <AttachFile />{" "}
            </label>
            <input id="label" className="input-file" type="file" placeholder="Attach proof of transfer" />
            {/* </div> */}
            <button type="submit" onClick={(e) => handleBuy.mutate(e)}>
              Kirim
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pay;
