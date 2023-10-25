import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import passwordReset from "./api/forgotPassword";
import ErrorMessage from "./utils/ErrorMessage";
import { useTranslation } from "react-i18next";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

const ForgotPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { data, isSuccess, refetch } = useQuery(["pw", email], passwordReset, {
    // useQuery will only trigger on refetch.
    enabled: false,
    retry: false,
    cacheTime: 0,
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  return (
    <>
      {isSuccess ? (
        <>
          <h2 className="message success my-5 ta-center">
            {t("Password reset link is send to your email")}
          </h2>
          <Button
            onClick={() => {
              navigate("/");
            }}
            text={t("Back to sign in")}
            type={"ghost"}
          />
        </>
      ) : (
        <>
          <h2 className="my-5 ta-center fs-18">{t("Forgot password?")}</h2>
          <div className="mb-5 fs-14 ta-center">
            {t(
              "Enter your email address below and we'll send you a link to reset your password."
            )}
          </div>
          {errorMessage ? <ErrorMessage errorMessage={errorMessage} /> : null}
          <form
            className="mb-5 df fdc gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              refetch();
            }}
          >
            <Input
              id="email"
              type="email"
              label={t("E-mail")}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
              key="email"
            />

            <Button className={"mt-1 mb-5"} text={t("Submit")} />

            <Button
              onClick={() => {
                navigate("/");
              }}
              text={t("Back to sign in")}
              type={"ghost"}
            />
          </form>
        </>
      )}
    </>
  );
};

export default ForgotPassword;
