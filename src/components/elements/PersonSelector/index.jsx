import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { FaCirclePlus, FaCircleMinus } from "react-icons/fa6";
import { updateRecipes } from "../../../store/shoppingListRecipesSlice";

const PersonSelector = ({ personsState, setPersonsState, recipeId }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const shopplingListRecipeData = {
    id: recipeId,
    persons: personsState,
  };

  const handlePersonsChange = () => {
    console.log("shopplingListRecipeData", shopplingListRecipeData);
    dispatch(updateRecipes(shopplingListRecipeData));
  };

  return (
    <div className="df aic gap-5">
      <button
        type="button"
        onClick={() => {
          personsState > 1 ? setPersonsState(personsState - 1) : null;
          handlePersonsChange();
        }}
      >
        <FaCircleMinus style={{ color: "#F1A661", fontSize: "22px" }} />
      </button>
      <div className="df fdc aic">
        <span className="fs-14">{t("Persons")}</span>
        <span className="text-main fw-semibold">{personsState}</span>
      </div>
      <button
        type="button"
        onClick={() => {
          setPersonsState(personsState + 1);
          handlePersonsChange();
        }}
      >
        <FaCirclePlus style={{ color: "#F1A661", fontSize: "22px" }} />
      </button>
    </div>
  );
};

export default PersonSelector;
