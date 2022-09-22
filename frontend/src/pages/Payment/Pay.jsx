import React, { useContext, useEffect } from "react";
import "./Pay.scss";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { useMutation } from "react-query";
import { API } from "../../config/api";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/StarBorder";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { flexbox } from "@mui/system";

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

  const tiers = [
    {
      title: "Free",
      price: "0",
      description: ["Trial 14 Days"],
      buttonText: "Sign up for free",
      buttonVariant: "outlined",
    },
    {
      title: "Basic Member",
      subheader: "Most popular",
      price: "15",
      description: ["access only to some movies & series.", "Help center access", "Priority email support"],
      buttonText: "Get started",
      buttonVariant: "contained",
    },
    {
      title: "Premium Member",
      price: "30",
      description: ["All Access Movies & Series", "Help center access", "Phone & email support"],
      buttonText: "Contact us",
      buttonVariant: "outlined",
    },
  ];

  return (
    <Container maxWidth="md" component="main">
      <Box
        sx={{
          width: "100%",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            display: flexbox,
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            paddingTop: "3rem",
            color: "#e50914",
          }}
        >
          <h2>
            DUMBFLIX <span style={{ color: "#929292", borderBottom: "2px solid #e50914 " }}>PREMIUM</span>
          </h2>
        </Box>
        <Grid
          container
          spacing={5}
          sx={{
            paddingTop: "2rem",
          }}
          alignItems="flex-end"
        >
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={tier.title} xs={12} sm={tier.title === "Premium Member" ? 12 : 6} md={4}>
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: "center" }}
                  action={tier.title === "Basic Member" ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: "center",
                  }}
                  sx={{
                    backgroundColor: (theme) => (theme.palette.mode === "light" ? theme.palette.grey[200] : theme.palette.grey[700]),
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "baseline",
                      mb: 2,
                    }}
                  >
                    <Typography component="h2" variant="h3" color="text.primary">
                      ${tier.price}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      /mo
                    </Typography>
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography component="li" variant="subtitle1" align="center" key={line}>
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant={tier.buttonVariant} type="submit" onClick={(e) => handleBuy.mutate(e)}>
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
    // <div className="app__payment">
    //   <div className="app__wrapper-payment">
    //     <h1>Premium</h1>
    //     <div className="app__payment-content">
    //       <p className="app__payment-desc">
    //         Bayar sekarang dan nikmati streaming film-film yang kekinian dari <span>DUMBFLIX</span> <br />
    //         <span>DUMBFLIX</span> : 0981312323
    //       </p>
    //       <div className="app__payment-form">
    //         <input className="input-number" type="number" placeholder="Input your account number" />
    //         {/* <div className="input-file"> */}
    //         <label htmlFor="label">
    //           Attache proof of transfer <AttachFile />{" "}
    //         </label>
    //         <input id="label" className="input-file" type="file" placeholder="Attach proof of transfer" />
    //         {/* </div> */}
    //         <button type="submit" onClick={(e) => handleBuy.mutate(e)}>
    //           Kirim
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Pay;
