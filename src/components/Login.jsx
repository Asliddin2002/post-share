import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { client } from "../client";
import { FcGoogle } from "react-icons/fc";
import { NotificationManager } from "react-notifications";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      sessionStorage.setItem("token", JSON.stringify(codeResponse.access_token));
      setUser(codeResponse);
    },
    onError: (error) => console.log("Login Failed:", error),
  });
  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          sessionStorage.setItem("user", JSON.stringify(res.data));
          setProfile(res.data);
          postSanity(res.data);

          // navigate("/");
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const postSanity = async (data) => {
    const doc = {
      _id: data.id,
      _type: "user",
      userName: data.name,
      image: data.picture,
    };
    await client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: "true" });
      NotificationManager.success(
        "Success message",
        "🥳🥳🥳 Regstratsiyadan muvaffaqiyatli o'tdingiz!",
        4000
      );
    });
  };

  return (
    <div className=" flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full ">
        <video
          src={require("./assets/bg-vedio.mp4")}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5 z-50 text-white text-2xl text-center font-bold">
            Web Dasturimga xush kelibsiz!
          </div>

          <div
            onClick={() => login()}
            className="px-3 py-2 flex text-lg items-center gap-2 bg-white shadow-md rounded-md  cursor-pointer "
          >
            <FcGoogle />
            Ro'yxatdan o'tish
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
