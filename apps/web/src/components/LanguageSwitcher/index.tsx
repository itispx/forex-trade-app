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
    <Dropdown
      className={styles["container"]}
      controlClassName={styles["control"]}
      placeholderClassName={styles["placeholder"]}
      menuClassName={styles["menu"]}
      arrowClassName={styles["arrow"]}
      options={lngs}
      onChange={(lngObj) => handleChange(lngObj)}
      value={lngs[0]}
      placeholder="Select an language"
    />
  );
};

export default LanguageSwitcher;
