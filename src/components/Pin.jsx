import React, { useState } from "react";
import { urlFor, client } from "../client";
import { v4 as uuidv4 } from "uuid";
import { MdDownloadForOffline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import { fetchUser } from "./utils/fetchUser";

const Pin = ({ pin: { postedBy, image, _id, destination, save } }) => {
  const [postHover, setPostHover] = useState(false);
  const [savingPost, setsavingPost] = useState(false);
  const navigate = useNavigate();

  const user = fetchUser();
  const alreadySaved = !!save?.filter(
    (item) => item?.postedBy?._id === user?.id
  )?.length;

  const adminId = process.env.REACT_APP_ADMIN_ID;

  const savePin = (id) => {
    if (!alreadySaved) {
      setsavingPost(true);
      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _id: uuidv4(),
            userId: user?.id,
            postedBy: {
              _type: "post",
              _ref: user?.id,
            },
          },
        ])
        .commit()
        .then(() => {
          window.location.reload();
          setsavingPost(false);
        });
    }
  };

  const deletePin = (id) => {
    if (postedBy?._id === user?.id) {
      client.delete(id).then(() => {
        window.location.reload();
        NotificationManager.success(
          "Success message",
          "Muvaffaqiyatli o'chirdingiz!",
          4000
        );
      });
    } else if (user?.id === adminId) {
      client.delete(id).then(() => {
        window.location.reload();
        NotificationManager.success(
          "Success message",
          "Muvaffaqiyatli o'chirdingiz!",
          4000
        );
      });
    } else {
      NotificationManager.error(
        "Error message",
        "Afsuski bu postni o'chira olmaysiz. Chunki bu post sizga tegishli emas. O'chirish uchun admin ga murojat qiling!",
        5000
      );
    }
  };

  return (
    <div className="m-2">
      <div
        onMouseEnter={() => setPostHover(true)}
        onMouseLeave={() => setPostHover(false)}
        onClick={() => navigate(`/pin-details/${_id}`)}
        className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        <img
          src={urlFor(image).width(250).url()}
          className="rounded-lg w-full"
          alt="user-post"
        />
        {postHover && (
          <div
            style={{ height: "100%" }}
            className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
          >
            <div className="flex items-center justify-between ">
              <div className="flex- gap-2">
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              {alreadySaved ? (
                <button
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                  type="button"
                >
                  {save?.length} Saqlandi
                </button>
              ) : (
                <button
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                  }}
                >
                  Saqlash
                </button>
              )}
            </div>
            <div className="flex justify-between items-center  gap-2 w-ful">
              {destination && (
                <a
                  href={destination}
                  target="_blank"
                  rel="noreffer"
                  className="bg-white flex items-center gap-2  text-black font-bold p-2 pl-4  pr-4  rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
                >
                  <BsFillArrowUpRightCircleFill />
                  {destination.length > 20
                    ? destination.slice(8, 20)
                    : destination.slice(8)}
                </a>
              )}
              <button
                className="bg-white p-2 opacity-70 hover:opacity-100 text-dark font-bold   text-base rounded-full hover:shadow-md outline-none"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  deletePin(_id);
                }}
              >
                <AiTwotoneDelete />
              </button>
            </div>
          </div>
        )}
      </div>
      <Link
        to={`user-profile/${postedBy?._id}`}
        className="flex gap-2 mt-2 items-center"
      >
        <img
          className="w-8 h-8 rounded-full  object-cover"
          src={postedBy?.image}
          alt="user-profile"
        />
        <p className="font-semibold capitalize">{postedBy?.userName}</p>
      </Link>
    </div>
  );
};

export default Pin;
