import React, { useState, useEffect } from "react";
import MasonryLayout from "./MasonryLayout";

import { client } from "../client";

import { searchQuery, feedQuery } from "./utils/data";
import Spinner from "./Spinner";

const Search = ({ searchTerm }) => {
  const [pins, setPins] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      const query = searchQuery(searchTerm.toLowerCase());
      setLoading(true);
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [searchTerm]);

  // if (loading) return <Spinner message="Qidiryapmiz" />;

  return (
    <div>
      {loading && <Spinner message="Qidiryapmiz" />}
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}
      {pins?.length === 0 && searchTerm !== "" && !loading && (
        <div className="mt-10 text-center text-xl">Rasm topilmadi!</div>
      )}
    </div>
  );
};

export default Search;
