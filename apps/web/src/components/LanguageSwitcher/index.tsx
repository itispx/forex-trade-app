import React from "react";
import styles from "./LanguageSwitcher.module.scss";

import Dropdown, { Option } from "react-dropdown";
import "react-dropdown/style.css";

import { useTranslation } from "next-i18next";

const lngs: Option[] = [
  { value: "en-US", label: "English - US" },
  { value: "pt-BR", label: "Português - BR" },
];

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const handleChange = (lngObj: Option) => {
    i18n.changeLanguage(lngObj.value);
  };

  return (
    <div data-testid="language-switcher-container" className={styles["container"]}>
      <Dropdown
        data-testid="language-switcher-dropdown"
        controlClassName={styles["control"]}
        placeholderClassName={styles["placeholder"]}
        options={lngs}
        onChange={(lngObj) => handleChange(lngObj)}
        value={lngs.find((lng) => i18n.language === lng.value)}
        placeholder="Select an language"
      />
    </div>
  );
};

export default LanguageSwitcher;
