import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import getRecipe from "./api/getRecipe";
import updateRecipe from "./api/updateRecipe";
import deleteRecipe from "./api/deleteRecipe";
import RecipeForm from "../../components/recipe/RecipeForm";
import Button from "../../components/ui/Button";
import { FaTrash } from "react-icons/fa";
import styles from "./recipe.module.scss";

const EditRecipe = () => {
  const userToken = useSelector((state) => state.user.value.token);
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const results = useQuery({
    queryKey: ["recipes", userToken, id],
    queryFn: getRecipe,
    ...{ enabled: !!userToken },
  });

  const recipe = results?.data?.data ?? [];

  const editMutation = useMutation({
    mutationFn: updateRecipe,
    onSuccess: (data) => {
      // queryClient.setQueryData("recipes", data);
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      navigate("/");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteRecipe,
    onSuccess: (data) => {
      // queryClient.setQueryData("recipes", data);
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      navigate("/");
    },
  });

  return (
    <>
      {/* <div className="df jcsb mb-4">
        <h2 className="fs-24">{t("Edit recipe")}</h2>
        <button
          onClick={(e) => {
            e.preventDefault();
            deleteMutation.mutate([userToken, id]);
          }}
        >
          <FaTrash />
        </button>
      </div> */}

      {results.isSuccess ? (
        <RecipeForm
          recipe={recipe}
          handleSubmit={(responseData) => {
            editMutation.mutate([responseData, userToken, id]);
          }}
        />
      ) : null}

      <Button
        onClick={() => {
          navigate("/");
        }}
        text={t("Cancel")}
        type="ghost"
        className="my-4"
      />
    </>
  );
};

export default EditRecipe;
