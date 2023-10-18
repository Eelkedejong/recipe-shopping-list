import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import createRecipe from "./api/createRecipe";
import RecipeForm from "../../components/recipe/RecipeForm";
import Button from "../../components/ui/Button";

const CreateRecipe = ({ userToken }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      navigate("/");
    },
  });

  return (
    <>
      <h2 className="fs-24 mb-4">{t("Add a new recipe")}</h2>
      <RecipeForm
        handleSubmit={(responseData) => {
          mutation.mutate([responseData, userToken]);
        }}
      />

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

export default CreateRecipe;
