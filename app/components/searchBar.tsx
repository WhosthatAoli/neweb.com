"use client";
import React from "react";
import { useState, useEffect } from "react";

export default function SearchBar() {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    window.location.href = `/search?search=${search}`;
  };

  return (
    <div>
      <input
        className="border-2 border-black text-black"
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
