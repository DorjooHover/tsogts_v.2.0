import { auth, provider } from "../../../config/firebase";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { Button, Grid, Link } from "@mui/material";
import { Google } from "@mui/icons-material";
import SignUp from "./Signup";
import { useRouter } from "next/router";
import React, { useState } from "react";

import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Head from "next/head";
// Images
import Image from "next/image";
// import GoogleImg from '../public/images/google.png';
import TsogtsLogo from "../../../public/images/tsogts.jpg";
// Icon
import GoogleIcon from "@mui/icons-material/Google";

const Login = ({ setUserData, userData }) => {
  const [signUp, setSignUp] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [login, setLogin] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [forgetPass, setForgetPass] = useState("");
  const [isForget, setIsForget] = useState(false);
  const router = useRouter();
  const [alert, setAlert] = useState({ type: "", message: "" });
  const loginWithGoogle = () => {
    signInWithPopup(auth, provider).catch((err) =>
      console.log(err.message, err.code)
    );
  };

  const loginUser = () => {
    // router.replace('/');

    setLoading(true);
    signInWithEmailAndPassword(auth, login.email, login.password)
      .then((res) => console.log(res))
      .catch((err) => {
        if (err.code == "auth/user-not-found") {
          setAlert((alert) => ({
            type: "warning",
            message: "Бүртгэлгүй имайл байна.",
          }));
        }
        if (err.code == "auth/invalid-email") {
          setAlert((alert) => ({
            type: "warning",
            message: "Имайл-ээ шалгана уу.",
          }));
        }
        if (err.code == "auth/wrong-password") {
          setAlert((alert) => ({
            type: "warning",
            message: "Нууц үг буруу байна.",
          }));
        }
      })
      .finally(() => {
        if (alert.type == "") {
          setAlert((alert) => ({
            type: "success",
            message: "Амжилттай нэвтэрлээ.",
          }));
        }
      });
  };

  const forgetPassword = () => {
    setAlert((alert) => ({
      type: "success",
      message: "Амжилттай хүсэлт илгээллээ.",
    }));
    return sendPasswordResetEmail(auth, forgetPass)
      .catch((err) => console.log(err))
      .finally(() => {
        setForgetPass("");
        setIsForget(false);
        setAlert((alert) => ({
          type: "",
          message: "",
        }));
      });
  };
  return (
    <>
      <div className="sign__container">
        <div className="sign__wrapper">
          <div className="sign__img">
            <Image
              src={TsogtsLogo}
              alt="Google Login"
              className="sign__img"
              priority
            ></Image>
          </div>
          {!signUp && !isForget && (
            <>
              <Head>
                <title>Нэвтрэх</title>
                <link
                  rel="icon"
                  href={"./images/tsogts.jpg"}
                  type="image/gif"
                  sizes="16x16"
                />
              </Head>
              <h1 className="header__main">Нэвтрэх хэсэг</h1>
              <div action="" className="sign__form">
                <input
                  type="email "
                  placeholder="Имэйл "
                  className="sign__input"
                  required
                  onChange={(e) =>
                    setLogin((login) => ({
                      ...login,
                      email: e.target.value,
                    }))
                  }
                  value={login.email}
                />
                <input
                  type="password"
                  placeholder="Нууц үг"
                  className="sign__input"
                  required
                  onChange={(e) =>
                    setLogin((login) => ({
                      ...login,
                      password: e.target.value,
                    }))
                  }
                  value={login.password}
                />
                <div className="display sign__btn">
                  <div className="sign__mail" onClick={loginWithGoogle}>
                    <GoogleIcon />
                  </div>
                  <input
                    type="submit"
                    className="sign__submit"
                    value="Нэвтрэх"
                    onClick={loginUser}
                  />
                </div>
              </div>
              <div className="help">
                <Link
                  onClick={() => setIsForget(true)}
                >
                  Нууц үг сэргээх
                </Link>

                <Link onClick={() => setSignUp(true)}>Бүртгүүлэх</Link>
              </div>
              {alert.type != "" && (
                <>
                  <Stack
                    sx={{
                      width: "100%",
                      // display: 'none'
                    }}
                  >
                    <Alert severity={alert.type}>{alert.message}</Alert>
                    {/* <Alert severity="success">
									Амжилттай нэвтэрлээ!
								</Alert> */}
                  </Stack>
                </>
              )}
            </>
          )}
          {signUp && !isForget && (
            <>
              <Head>
                <title>Бүртгүүлэх</title>
                <link
                  rel="icon"
                  href={"./images/tsogts.jpg"}
                  type="image/gif"
                  sizes="16x16"
                />
              </Head>
              <h1 className="header__main">Бүртгүүлэх хэсэг</h1>
              <SignUp setUserData={setUserData} userData={userData} />

              <div className="help">
                <Link onClick={() => setSignUp(false)}>Нэвтрэх</Link>
              </div>
              <Stack
                sx={{
                  width: "100%",
                  // display: 'none'
                }}
              >
                <Alert severity={alert.type}>{alert.message}</Alert>
                {/* <Alert severity="success">
									Амжилттай бүртгэгдлээ!
								</Alert> */}
              </Stack>
            </>
          )}
          {isForget && (
            <>
              <Head>
                <title>Нууц үг сэргээх</title>
                <link
                  rel="icon"
                  href={"./images/tsogts.jpg"}
                  type="image/gif"
                  sizes="16x16"
                />
              </Head>
              <h1 className="header__main">Нууц үг хэсэг</h1>
              <div action="" className="sign__form">
                <input
                  type="email "
                  placeholder="Имэйл "
                  className="sign__input"
                  required
                  onChange={(e) => setForgetPass(e.target.value)}
                  value={forgetPass}
                />

                <input
                  type="submit"
                  className="sign__submit"
                  value="Илгээх"
                  onClick={forgetPassword}
                />
              </div>
              <div className="help">
                <Link onClick={() => setIsForget(false)}>Нэвтрэх</Link>

                <Link onClick={() => setSignUp(true)}>Бүртгүүлэх</Link>
              </div>
              {alert.type != "" && (
                <>
                  <Stack
                    sx={{
                      width: "100%",
                      // display: 'none'
                    }}
                  >
                    <Alert severity={alert.type}>{alert.message}</Alert>
                    {/* <Alert severity="success">
                                Амжилттай нэвтэрлээ!
                            </Alert> */}
                  </Stack>
                </>
              )}
            </>
          )}
        </div>
        {!isLogin && (
          <div>
            <SignUp setUserData={setUserData} userData={userData} />
            <button onClick={() => setIsLogin(true)}>login</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
