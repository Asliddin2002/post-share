import React from "react";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import {
  Feed,
  PinDetails,
  CreatePin,
  Search,
  Navbar,
} from "../components/index";

const Pins = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="px-2 md:px-5">
      <div className="bg-gray-50">
        <Navbar
          searchTerm={searchTerm}
          user={user}
          setSearchTerm={setSearchTerm}
        />
      </div>
      <div className="w-full">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/categories/:categoryId" element={<Feed />} />
          <Route
            path="/pin-details/:pinId"
            element={<PinDetails user={user} />}
          />
          <Route path="/create-pin" element={<CreatePin user={user} />} />
          <Route
            path="/search"
            element={
              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Pins;
