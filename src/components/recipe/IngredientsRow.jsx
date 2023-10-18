import { useState, useContext, useEffect } from "react";
import IngredientContext from "./utils/ingredientContext";
import Input from "../ui/Input";
import { FaMinusCircle } from "react-icons/fa";
import styles from "./recipe.module.scss";

const IngredientsRow = ({ ingredient, index }) => {
  const [ingredientRows, setIngredientRows] = useContext(IngredientContext);
  const [rowData, setRowData] = useState(ingredient);

  useEffect(() => {
    let newData = (ingredientRows[index] = rowData);
    ingredientRows[index] = newData;
    setIngredientRows(ingredientRows);
  }, [rowData]);

  return (
    <>
      <div
        className={`dg gap-4 ${styles.grid}`}
        id={`row_${index}`}
        key={index}
      >
        <Input
          id={`ingredient_${index}`}
          required={true}
          value={ingredient.ingredient}
          key={`ingredient_${ingredient.ingredient}`}
          onChange={(e) =>
            setRowData({ ...rowData, ingredient: e.target.value })
          }
        />

        <Input
          id={`amount_${index}`}
          required={true}
          type={"number"}
          value={ingredient.amount}
          key={`amount_${ingredient.amount}`}
          onChange={(e) =>
            setRowData({ ...rowData, amount: parseInt(e.target.value) })
          }
        />

        <Input
          id={`unit_${index}`}
          required={true}
          value={ingredient.unit}
          key={`unit_${ingredient.unit}`}
          onChange={(e) => setRowData({ ...rowData, unit: e.target.value })}
        />

        <button
          onClick={(e) => {
            e.preventDefault();
            const newRows = ingredientRows.filter((_, i) => i !== index);
            setIngredientRows(newRows);
          }}
        >
          <FaMinusCircle />
        </button>
      </div>
    </>
  );
};

export default IngredientsRow;
