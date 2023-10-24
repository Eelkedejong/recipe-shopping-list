import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import passwordReset from "./api/passwordReset";
import { useTranslation } from "react-i18next";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

const PasswordReset = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  console.log("token", token);
  const { id } = useParams();
  console.log("id", id);
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { data, isSuccess, refetch } = useQuery(
    ["reset", password, id, token],
    passwordReset,
    {
      // useQuery will only trigger on refetch.
      enabled: false,
      retry: false,
      onError: (error) => {
        setErrorMessage(error.message);
      },
    }
  );

  return (
    <>
      {isSuccess ? (
        <>
          <h2 className="my-5 ta-center">
            {t("Password is successfully reset")}
          </h2>
          <Link to="/"> {t("Sign in")} </Link>
        </>
      ) : (
        <>
          <h2 className="my-5 ta-center">{t("Reset your password")}</h2>
          <form
            className="mb-5 df fdc gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (password === passwordConfirmation) {
                refetch();
              } else {
                setErrorMessage("Passwords do not match");
              }
            }}
          >
            <Input
              id="password"
              type="password"
              label={t("New Password")}
              required={true}
              onChange={(e) => setPassword(e.target.value)}
              key="password"
            />

            <Input
              id="password-confirmation"
              type="password-confirmation"
              label={t("Confirm Password")}
              required={true}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              key="password-confirmation"
            />

            <Button
              onClick={() => {
                console.log("clicked");
              }}
              text={t("Confirm new password")}
            />
          </form>
        </>
      )}
    </>
  );
};

export default PasswordReset;
