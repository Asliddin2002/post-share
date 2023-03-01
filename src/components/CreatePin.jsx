import React, { useState } from "react";

import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { client } from "../client";
import Spinner from "./Spinner";
import { categories } from "./utils/data";
import { useNavigate } from "react-router-dom";
import { NotificationManager } from "react-notifications";

const CreatePin = ({ user }) => {
  const [title, setTile] = useState("");
  const [about, setAbout] = useState("");
  const [destination, setDestination] = useState("");
  const [field, setFields] = useState(false);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [wrongImageType, setWrongImageType] = useState(false);

  const navigate = useNavigate();

  const uploadImage = (e) => {
    const { type, name } = e.target.files[0];
    if (
      type === "image/png" ||
      type === "image/svg" ||
      type === "image/jpeg" ||
      type === "image/gif" ||
      type === "image/tiff"
    ) {
      setWrongImageType(false);
      setLoading(true);
      client.assets
        .upload("image", e.target.files[0], {
          contentType: type,
          filename: name,
        })
        .then((data) => {
          setImageAsset(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log("Image upload Error", err);
        });
    } else {
      setWrongImageType(true);
    }
  };

  const savePin = () => {
    if (title && about && destination && imageAsset?._id && category) {
      const doc = {
        _type: "pin",
        title,
        about,
        destination,
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: imageAsset?._id,
          },
        },
        userId: user._id,
        postedBy: {
          _type: "postedBy",
          _ref: user._id,
        },
        category,
      };
      client.create(doc).then(() => {
        navigate("/");
        NotificationManager.success(
          "Success message",
          "🥳🥳🥳 Rasm muvaffaqiyatli qo'shildi!",
          4000
        );
      });
    } else {
      setFields(true);
      setTimeout(() => setFields(false), 4000);
      NotificationManager.warning(
        "Ogohlantirish",
        "😐😐😐 Iltimos barcha bo'sh joylarni to'ldiring!",
        4000
      );
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
      {/* {field && (
        <p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in">
          Iltimos barcha bo'sh joylarni to'ldiring.
        </p>
      )} */}
      <div className="flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full">
        <div className="bd-secondaryColor p-3 flex flex-0.7 w-full ">
          <div className="felx justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
            {loading && <Spinner />}
            {wrongImageType && <p>Xato formatdagi rasm yukladingiz.</p>}
            {!imageAsset ? (
              <label>
                <div className="flex flex-col items-center justify-center h-full">
                  <div className=" flex flex-col justify-center items-center">
                    <p className="font-bold text-2xl">
                      <AiOutlineCloudUpload />
                    </p>
                    <p className="text-lg">Rasm yuklash uchun bosing.</p>
                  </div>
                  <p className="mt-32 text-gray-400">
                    Tavsiya qilinadi: JPG, SVG, PNG, GIF or TIFF kabi 20 mg dan
                    kam bo'lgan rasm formatlar.
                  </p>
                </div>
                <input
                  type="file"
                  name="upload-image"
                  onChange={uploadImage}
                  className="w-0 h-0"
                />
              </label>
            ) : (
              <div className="relative h-full">
                <img
                  src={imageAsset?.url}
                  alt="uploaded-image"
                  className="w-full h-full"
                />
                <button
                  className=" absolute bottom-3 right-3 p-3  rounded-full bg-white text-xl  cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                  type="button"
                  onClick={() => setImageAsset(null)}
                >
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-6 lg:pl-5  mt-5 w-full">
          <input
            type="text"
            value={title}
            onChange={(e) => setTile(e.target.value)}
            placeholder="Rasmga nom bering"
            className="outline-none text-base sm:text-lg font-medium border-b-2 border-gray-200 p-2"
          />
          {user && (
            <div className=" flex gap-2 my-2 items-center bg-white rounded-lg">
              <img
                src={user.image}
                alt="user-image"
                className="w-10  h-10 rounded-full"
              />
              <p className="font-bold">{user.userName}</p>
            </div>
          )}
          <input
            type="text"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Rasm nima haqida"
            className="outline-none  text-base sm:text-lg font-medium border-b-2 border-gray-200 p-2"
          />
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Manba linkini ulashing"
            className="outline-none  text-base sm:text-lg font-medium border-b-2 border-gray-200 p-2"
          />
          <div className="flex flex-col">
            <div>
              <p className="mb-2 font-medium text-lg sm:text-lg">
                Rasm uchun kategoriya tanlang
              </p>
              <select
                name=""
                onChange={(e) => setCategory(e.target.value)}
                id=""
                className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
              >
                <option value="other" className="bg-white">
                  Kategoriyani tanlang
                </option>
                {categories.map((category, i) => (
                  <option
                    key={i}
                    className="text-base border-0  outline-none capitalize bg-white text-black"
                    value={category.name}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end items-end mt-5">
              <button
                type="button"
                onClick={savePin}
                className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none"
              >
                Saqlash
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePin;
