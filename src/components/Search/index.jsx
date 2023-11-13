import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import getSearchResults from "../../pages/recipe/api/searchRecipe";
import Input from "../ui/Input";
import { FaSearch } from "react-icons/fa";
import styles from "./search.module.scss";

const Search = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [disabled, setDisabled] = useState(true);

  const token = "token";

  const { data, isSuccess, refetch } = useQuery(
    ["recipeSearch", token, searchQuery],
    getSearchResults,
    {
      // useQuery will only trigger on refetch.
      enabled: false,
      onError: (error) => {
        // setErrorMessage(error.message);
      },
    }
  );

  return (
    <>
      <form
        className="mb-5 df fdc gap-4 pos-relative"
        onSubmit={(e) => {
          e.preventDefault();
          refetch();
        }}
      >
        <Input
          id="search"
          label={t("Zoek recept")}
          classes={styles.search}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            if (e.target.value !== "") {
              setDisabled(false);
            } else {
              setDisabled(true);
            }
          }}
          key="search"
        />

        <button className={styles.searchButton} disabled={disabled}>
          <FaSearch />
        </button>
      </form>
    </>
  );
};

export default Search;
