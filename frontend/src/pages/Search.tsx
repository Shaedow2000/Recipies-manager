import { useNavigate } from "react-router";

function Search() {
  const navigate = useNavigate();

  return (
    <section>
      <div className="top">
        <h1>Search</h1>
        <a onClick={() => navigate("/")}>Home</a>
      </div>
    </section>
  );
}

export default Search;
