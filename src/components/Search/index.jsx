import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { updateSearch } from "../../store/searchParamsSlice";
import Input from "../ui/Input";
import { FaSearch } from "react-icons/fa";
import styles from "./search.module.scss";

const Search = () => {
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
    <>
      <form
        className="mb-5 df fdc gap-4 pos-relative"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(updateSearch(searchQuery));
        }}
      >
        <Input
          id="search"
          label={t("Zoek recept")}
          classes={styles.search}
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

        <button className={styles.searchButton} disabled={disabled}>
          <FaSearch />
        </button>
      </form>
    </>
  );
};

export default Search;
