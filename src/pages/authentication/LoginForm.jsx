import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LoginContext from "./utils/loginContext";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

const LoginForm = ({ refetch }) => {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [, setLoginData] = useContext(LoginContext);

  return (
    <>
      <h2 className="my-5 ta-center">{t("Log in to view your recipes!")}</h2>
      <form
        className="mb-5 df fdc gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          refetch();
        }}
      >
        <Input
          id="email"
          // type="email"
          label={t("E-mail")}
          required={true}
          onChange={(e) => setEmail(e.target.value)}
          key="email"
        />

        <Input
          id="password"
          type="password"
          label={t("Password")}
          required={true}
          onChange={(e) => setPassword(e.target.value)}
          key="password"
        />

        <div className="df jcc">
          <Link to="/forgot-password">{t("Forgot password?")}</Link>
        </div>

        <Button
          onClick={() => {
            setLoginData({
              email: email,
              password: password,
            });
          }}
          text={t("Sign in")}
        />
      </form>
    </>
  );
};

export default LoginForm;
