import React, { ChangeEvent, HTMLInputTypeAttribute, InputHTMLAttributes } from "react";
import styles from "./TextFormField.module.scss";

interface Props {
  id: string;
  name: string;
  type: HTMLInputTypeAttribute;
  placeholder: string;
  value: string | number;
  onChange: (e: string | ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: any) => void;
  touched?: boolean;
  errors?: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
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
  inputProps,
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
        {...inputProps}
      />

      <span className={styles["error-message"]}>&#8205;{touched && errors}</span>
    </div>
  );
};

export default TextFormField;
