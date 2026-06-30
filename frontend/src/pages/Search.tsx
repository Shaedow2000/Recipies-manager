import { useRef } from "react";
import { useNavigate } from "react-router";

function Search() {
  const navigate = useNavigate();
  const foundRecipesDivRef = useRef(null);

  function handleSearch(e: any) {}

  return (
    <section>
      <div className="top">
        <h1>Search</h1>
        <a onClick={() => navigate("/")}>Home</a>
      </div>
      <div>
        <input onChange={handleSearch} placeholder="search" />
        <div className="found-recipes" ref={foundRecipesDivRef}></div>
      </div>
    </section>
  );
}

export default Search;
