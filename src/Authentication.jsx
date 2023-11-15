import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { user } from "./store/userSlice";
import LoginContext from "./pages/authentication/utils/loginContext";
import getUser from "./pages/authentication/api/getUser";
import CreateForm from "./pages/authentication/CreateForm";
import LoginForm from "./pages/authentication/LoginForm";
import ErrorMessage from "./pages/authentication/utils/ErrorMessage";
import ForgotPassword from "./pages/authentication/ForgotPassword";
import PasswordReset from "./pages/authentication/PasswordReset";
import {
  getStoredUserData,
  removeUserData,
  saveUserData,
} from "./pages/authentication/utils/storage";
import Layout from "./Layout";
import Button from "./components/ui/Button";
import styles from "./pages/authentication/authentication.module.scss";
import logo from "./assets/logo.svg";

const Authentication = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const loginData = useState(null);
  const [formType, setFormType] = useState("signin");
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch the user data.
  const { data, isSuccess, refetch } = useQuery(
    ["user", loginData, formType],
    getUser,
    {
      // useQuery will only trigger on refetch.
      enabled: false,
      initialData: getStoredUserData(),
      retry: false,
      onError: (error) => {
        setErrorMessage(error.message);
        removeUserData;
      },
    }
  );

  // Check if there is saved user data.
  const userData = getStoredUserData();
  let savedUserData = userData;
  let showLoginForm = false;

  // If the user is logged in, save the token.
  if (isSuccess) {
    if (!userData) {
      const newToken = data?.token;
      const newUsername = data?.username;
      saveUserData(newToken, newUsername);
      savedUserData = { token: newToken, username: newUsername };
    }
    // Set the user data in the store.
    dispatch(user(data));
  } else {
    // Only show the login form if there is no userToken.
    showLoginForm = true;
  }

  // If there is a saved token, set it as the active userToken.
  const newUserData = savedUserData;

  return (
    <>
      {newUserData ? <Layout /> : null}

      {showLoginForm ? (
        <>
          <h1 className="ff-logo text-white mt-4" style={{ fontSize: "38px" }}>
            Cookbook
          </h1>
          <div className="mb-5 df aic jcc h-100">
            <main
              className={`bg-white rounded-l centered p-5 ${styles.authentication}`}
            >
              <div className="mb-4 df jcc">
                <img src={logo} alt="Chef" />
              </div>
              {errorMessage ? (
                <ErrorMessage errorMessage={errorMessage} />
              ) : null}
              {/* Define the routes for the website authentication */}
              <Routes>
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:id" element={<PasswordReset />} />
                <Route
                  path="/"
                  element={
                    <>
                      <LoginContext.Provider value={loginData}>
                        {formType === "signin" ? (
                          <LoginForm refetch={refetch} />
                        ) : (
                          <CreateForm refetch={refetch} />
                        )}
                        <Button
                          className={"w-100"}
                          onClick={() => {
                            {
                              // Toggle between the forms.
                              formType === "signin"
                                ? setFormType("user")
                                : setFormType("signin");
                              setErrorMessage("");
                            }
                          }}
                          text={
                            formType === "signin"
                              ? `${t("Create account")}`
                              : `${t("Sign in")}`
                          }
                          type={"ghost"}
                        />
                      </LoginContext.Provider>
                    </>
                  }
                />
              </Routes>
            </main>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Authentication;
