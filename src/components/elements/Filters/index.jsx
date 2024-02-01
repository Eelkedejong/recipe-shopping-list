import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import { updateTags, updateTime } from "../../../store/searchParamsSlice";
import { useTranslation } from "react-i18next";
import getRecipeFilter from "../../../pages/recipe/api/filters/getRecipeFilter";
import { FaSliders, FaX } from "react-icons/fa6";
import styles from "./filters.module.scss";
import Button from "../../ui/Button";

const Filters = () => {
  const user = useSelector((state) => state.user.value);
  const selectedTags = useSelector((state) => state.searchParams.value.tags);
  const selecedTime = useSelector((state) => state.searchParams.value.time);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const results = useQuery({
    queryKey: ["tags", user.token, "tags"],
    queryFn: getRecipeFilter,
    ...{
      // The query will not execute until the userToken exists.
      enabled: !!user.token,
    },
  });

  const filterOptions = results?.data?.data ?? [];

  const timeOptions = [
    {
      label: `${t("All")}`,
      value: "",
    },
    {
      label: "< 60",
      value: 60,
    },
    {
      label: "< 45",
      value: 45,
    },
    {
      label: "< 30",
      value: 30,
    },
    {
      label: "< 15",
      value: 15,
    },
  ];

  return (
    <aside>
      <button
        onClick={() => setOpen(!open)}
        className={`bg-main p-3 rounded-full text-white df aic jcc ${styles.filterToggle} `}
      >
        <FaSliders />
      </button>
      <div
        className={`
          bg-white rounded-m mr-5 d-pb-3 
          ${styles.content} 
          ${open ? styles.open : null}
        `}
      >
        <div className="px-5 py-4 bg-main-light rounded-top-m df jcsb">
          <h2 className="fw-bold fs-20">{t("Filter")}</h2>
          <button onClick={() => setOpen(!open)}>
            <FaX />
          </button>
        </div>
        {filterOptions.length ? (
          <>
            <ul className="p-5 df fdc gap-3 my-3">
              <h3 className="fw-semibold fs-26 mb-2">{t("Labels")}</h3>
              {filterOptions.map((tag) => (
                <li key={tag} className="fw-light fs-14 text-dark-grey">
                  <label className="mr-2 df gap-3 label">
                    <input
                      type="checkbox"
                      name={tag}
                      id={tag}
                      checked={selectedTags.includes(tag)}
                      onChange={() => {
                        dispatch(updateTags(tag));
                      }}
                      className="checkbox filled"
                    />
                    {tag}
                  </label>
                </li>
              ))}
            </ul>
            <hr className="mx-3" />
          </>
        ) : null}

        <ul className="p-5 df fdc gap-3 my-3">
          <h3 className="fw-semibold fs-26 mb-2">{t("Cooking time")}</h3>
          {timeOptions.map((time, index) => {
            return (
              <li key={time.label} className="fw-light fs-14 text-dark-grey">
                <label className="mr-2 df gap-3 label">
                  <input
                    type="radio"
                    name="cooking-time"
                    id={time.label}
                    checked={time.value === selecedTime}
                    onChange={() => {
                      if (time.value) {
                        dispatch(updateTime(time.value));
                      } else {
                        dispatch(updateTime(""));
                      }
                    }}
                    className="checkbox filled"
                  />
                  {time.label} {index > 0 ? t("min") : null}
                </label>
              </li>
            );
          })}
        </ul>

        <div className="m-4 mt-5 desktop-hidden">
          <Button text={t("View recipes")} onClick={() => setOpen(!open)} />
        </div>
      </div>
    </aside>
  );
};

export default Filters;
