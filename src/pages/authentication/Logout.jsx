import { removeUserData } from "./utils/storage";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import Button from "../../components/ui/Button";

const Logout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = () => {
    // queryClient.removeQueries("user");
    queryClient.invalidateQueries();
    removeUserData();

    // TODO: find a different solution to redirect after logging out.
    navigate("/");
    window.location.reload(true);
  };

  return <Button onClick={handleLogout} text={t("Logout")} type="ghost" />;
};

export default Logout;
