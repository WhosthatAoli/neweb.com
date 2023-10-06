"use client";
import React from "react";
import { useState, useEffect } from "react";
import searchIcon from "../lib/assets/searchIcon.svg";

export default function SearchBar() {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    window.location.href = `/search?search=${search}`;
  };

  return (
    <div className="relative flex items-center">
      <input
        className="border-2 border-gray-300 text-black rounded-md pl-2 pr-4 py-2 w-full"
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        placeholder="Search"
      />
      <img
        className="flex items-center h-6 pl-2 cursor-pointer"
        src={searchIcon.src}
        alt="Search Icon"
        onClick={handleSearch}
      />
    </div>
  );
}
