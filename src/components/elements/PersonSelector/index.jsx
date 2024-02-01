import { useTranslation } from "react-i18next";
import { FaCirclePlus, FaCircleMinus } from "react-icons/fa6";

const PersonSelector = ({ personsState, setPersonsState }) => {
  const { t } = useTranslation();

  return (
    <div className="df aic gap-5">
      <button
        type="button"
        onClick={() =>
          personsState > 1 ? setPersonsState(personsState - 1) : null
        }
      >
        <FaCircleMinus style={{ color: "#F1A661", fontSize: "22px" }} />
      </button>
      <div className="df fdc aic">
        <span className="fs-14">{t("Persons")}</span>
        <span className="text-main fw-semibold">{personsState}</span>
      </div>
      <button type="button" onClick={() => setPersonsState(personsState + 1)}>
        <FaCirclePlus style={{ color: "#F1A661", fontSize: "22px" }} />
      </button>
    </div>
  );
};

export default PersonSelector;
