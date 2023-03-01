import React from "react";
import { NavLink, Link } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
import { IoIoArrowForward } from "react-icons/io";
import { categories } from "./utils/data";

const SideBar = ({ user, closeTogle }) => {
  const isNotActiveStyle =
    "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize";

  const isActiveStyle =
    "flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize";
  const handleCloseSidebar = () => {
    if (closeTogle) closeTogle(false);
  };
  return (
    <div className="flex flex-col justify-between bg-white h-full overflow-y-scrikk min-w-210 hide-scrollbar">
      <div className="flex flex-col">
        <Link
          onClick={handleCloseSidebar}
          to="/"
          className="flex px-5 gap-2 my-6 pt-1 text-2xl font-bold w-190 items-center"
        >
          KhoAs
        </Link>
        <div className="flex flex-col gap-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            <RiHomeFill /> Home
          </NavLink>
          <h3 className="mt-2 px-5 text-base 2xl:text-xl">Kategoriyalar</h3>
          {categories.slice(0, categories.length).map((category) => (
            <NavLink
              to={`/categories/${category.name}`}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
              onClick={handleCloseSidebar}
              key={category.name}
            >
              <img
                src={category.image}
                alt="category-image"
                className="w-8 h-8 rounded-full shadow-sm"
              />
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
      <div>
        {user && (
          <Link
            className="flex mt-5 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3"
            to={`user-profile/${user._id}`}
          >
            <img
              src={user.image}
              className="w-10 h-10 rounded-full"
              alt="user profile"
            />
            {user.userName}
          </Link>
        )}
        <span className="text-[13px] text-gray-400 text-center">
          Created by Kholturaev Asliddin
        </span>
      </div>
    </div>
  );
};

export default SideBar;
