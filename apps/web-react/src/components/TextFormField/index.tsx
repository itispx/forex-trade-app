import React, { ChangeEvent } from "react";
import styles from "./TextFormField.module.scss";

interface Props {
  id: string;
  name: string;
  type: "text" | "password";
  placeholder: string;
  value: string;
  onChange: (e: string | ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: any) => void;
  touched?: boolean;
  errors?: string;
}

const TextFormField: React.FC<Props> = ({
  id,
  name,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  touched,
  errors,
}) => {
  return (
    <div className={styles["container"]}>
      <input
        className={styles["field"]}
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />

      <span className={styles["error-message"]}>{touched && errors}</span>
    </div>
  );
};

export default TextFormField;
