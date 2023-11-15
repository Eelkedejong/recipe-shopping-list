import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import { updateType } from "../../store/searchParamsSlice";
import { useTranslation } from "react-i18next";
import getRecipeFilter from "../../pages/recipe/api/filters/getRecipeFilter";
import styles from "./recipe.module.scss";

const TypesList = () => {
  const user = useSelector((state) => state.user.value);
  const type = useSelector((state) => state.searchParams.value.type);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [activeFilter, setActiveFilter] = useState(type ? type : "All");

  const results = useQuery(["types", user.token, "types"], getRecipeFilter, {
    // The query will not execute until the userToken exists.
    enabled: !!user.token,
  });

  const filterOptions = results?.data?.data ?? [];

  // Add an extra "All" type to the filter options.
  if (results.isSuccess) {
    if (!filterOptions.includes(t("All"))) {
      filterOptions.unshift(t("All"));
    }
  }

  return (
    <>
      {filterOptions.length ? (
        <div className="df gap-3 mb-5">
          {filterOptions.map((type) => (
            <button
              onClick={() => {
                if (type === "All") {
                  dispatch(updateType(""));
                } else {
                  dispatch(updateType(type));
                }
                setActiveFilter(type);
              }}
              className={`py-2 px-4 text-blue bg-blue-lighter rounded-s fs-12 fw-semibold ${
                activeFilter === type ? styles.activeType : ""
              }`}
              key={type}
            >
              {type}
            </button>
          ))}
        </div>
      ) : null}
    </>
  );
};

export default TypesList;
