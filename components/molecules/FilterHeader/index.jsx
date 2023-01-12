import React from "react";

export default function FilterHeader({ selectedItem }) {
  const handleChange = (event) => {
    const item = event.target.value;
    selectedItem(item);
  };

  return (
    <div className="w-[329px] my-0 mx-auto mt-10">
      <select
        name=""
        id=""
        onChange={handleChange}
        className="p-1 rounded-md border border-[#EF6D58] w-full "
      >
        <option value="all"> Show All</option>
        <option value="Comedy">Comedy</option>
        <option value="Drama">Drama</option>
        <option value="Science fiction">Science Fiction</option>
        <option value="Fantasy">Fantasy</option>
        <option value="Horror">Horror</option>
        <option value="Thriller">Thriller</option>
        <option value="Romance">Romance</option>
        <option value="Action and adventure">Action and adventure</option>
      </select>
    </div>
  );
}
