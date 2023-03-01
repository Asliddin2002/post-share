import React from "react";
import { Sidebar, UserPorile, UserProfile } from "../components";
import { client } from "../client";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import Pins from "./Pins";
import { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { userQuery } from "../components/utils/data";
import { useEffect } from "react";
import { useRef } from "react";
import { fetchUser } from "../components/utils/fetchUser";

const Home = () => {
  const [togle, setTogle] = useState(false);
  const [user, setUser] = useState(null);
  const scrollRef = useRef(null);

  const userInfo = fetchUser();

  useEffect(() => {
    const query = userQuery(userInfo?.id);
    client.fetch(query).then((res) => setUser(res[0]));
  }, []);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out ">
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar user={user && user} />
      </div>
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu
            fontSize={40}
            className="cursor-pointer"
            onClick={() => setTogle(true)}
          />
          <Link className="flex pt-1 text-xl font-bold  items-center" to="/">
            KhoAs
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img
              src={user?.image}
              className="w-12 h-12 rounded-full"
              alt="user image"
            />
          </Link>
        </div>
        {togle && (
          <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center">
              <AiFillCloseCircle
                fontSize={30}
                className="cursor-pointer"
                onClick={() => setTogle(false)}
              />
            </div>
            <Sidebar user={user && user} closeTogle={setTogle} />
          </div>
        )}
      </div>

      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Pins user={user && user} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;

//1:44
