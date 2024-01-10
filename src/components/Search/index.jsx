import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { updateSearch } from "../../store/searchParamsSlice";
import Input from "../ui/Input";
import { FaSearch } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

const Search = ({ openState }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = useSelector((state) => state.searchParams.value);
  const { search } = searchParams;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState(search);
  const [disabled, setDisabled] = useState(true);
  const [inputKey, setInputKey] = useState(0);

  // Reset the search input when the search query is reset.
  useEffect(() => {
    if (search === "") {
      setSearchQuery("");
      setInputKey((prevKey) => prevKey + 1);
    }
  }, [search]);

  return (
    <div className={`search-wrapper ${openState ? "open" : ""}`}>
      <form
        className="df fdc gap-4 pos-relative"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(updateSearch(searchQuery));

          // Navigate to the recipes page if the user is not already there.
          if (location.pathname !== "/recipes") {
            navigate("/recipes");
          }
        }}
      >
        <Input
          id="search"
          label={t("Zoek recept")}
          classes="search-input"
          value={searchQuery ? searchQuery : ""}
          key={inputKey}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            if (e.target.value !== "") {
              setDisabled(false);
            } else {
              setDisabled(true);
            }
          }}
        />

        {!disabled ? (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setSearchQuery("");
              setDisabled(true);
              dispatch(updateSearch(""));
            }}
            className="search-clear df aic"
          >
            <FaX />
          </button>
        ) : null}

        <button className="search-button" disabled={disabled}>
          <FaSearch />
        </button>
      </form>
    </div>
  );
};

export default Search;
