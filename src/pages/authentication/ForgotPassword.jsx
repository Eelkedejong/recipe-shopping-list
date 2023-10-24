import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import passwordReset from "./api/forgotPassword";
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
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  return (
    <>
      {isSuccess ? (
        <>
          <h2 className="my-5 ta-center">
            {t("Password reset link is send to your email")}
          </h2>
        </>
      ) : (
        <>
          <h2 className="my-5 ta-center">{t("Reset your password")}</h2>
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

            <Button
              onClick={() => {
                console.log("clicked");
              }}
              text={t("Reset password")}
            />

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
