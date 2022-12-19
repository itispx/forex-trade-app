import React from "react";
import styles from "./SignUpForm.module.scss";

import { useTranslation } from "next-i18next";

import { Formik, FormikProps } from "formik";
import * as yup from "yup";

import TextFormField from "../../TextFormField";
import Loading from "../../Loading";

interface Props {
  submitHandler: (username: string, password: string) => void;
  isLoading: boolean;
  inputRef?: React.RefObject<
    FormikProps<{
      username: string;
      password: string;
    }>
  >;
}

const SignUpForm: React.FC<Props> = ({ submitHandler, isLoading, inputRef }) => {
  const { t: tAuth } = useTranslation("auth");
  const { t: tCommon } = useTranslation("common");

  const signUpSchema = yup.object({
    username: yup
      .string()
      .typeError(tAuth("username_invalid") as string)
      .min(3, tAuth("username_length_requirement") as string)
      .required(tAuth("username_required") as string),
    password: yup
      .string()
      .required(tAuth("password_required") as string)
      .min(6, tAuth("password_length_requirement") as string)
      .matches(/^(?=.*[A-Za-z])/, tAuth("password_letter_requirement") as string)
      .matches(/^(?=.*[(0-9])/, tAuth("password_number_requirement") as string),
    confirmPassword: yup
      .string()
      .required(tAuth("confirm_password_required") as string)
      .oneOf(
        [yup.ref("password"), null],
        tAuth("confirm_password_match_requirement") as string,
      ),
  });

  return (
    <form>
      <Formik
        validationSchema={signUpSchema}
        initialValues={{ username: "", password: "", confirmPassword: "" }}
        onSubmit={(values) => submitHandler(values.username, values.password)}
      >
        {(fprops) => (
          <div className={styles["container"]}>
            <TextFormField
              id="username"
              name="username"
              type="text"
              placeholder={tAuth("username")}
              value={fprops.values.username}
              onChange={fprops.handleChange("username")}
              onBlur={fprops.handleBlur("username")}
              touched={fprops.touched.username}
              errors={fprops.errors.username}
            />
            <TextFormField
              id="password"
              name="password"
              type="password"
              placeholder={tAuth("password")}
              value={fprops.values.password}
              onChange={fprops.handleChange("password")}
              onBlur={fprops.handleBlur("password")}
              touched={fprops.touched.password}
              errors={fprops.errors.password}
            />
            <TextFormField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder={tAuth("confirm_password")}
              value={fprops.values.confirmPassword}
              onChange={fprops.handleChange("confirmPassword")}
              onBlur={fprops.handleBlur("confirmPassword")}
              touched={fprops.touched.confirmPassword}
              errors={fprops.errors.confirmPassword}
            />

            {isLoading ? (
              <div className={styles["loading-container"]}>
                <Loading />
              </div>
            ) : (
              <div
                data-testid="submit-button"
                className={styles["submit"]}
                onClick={() => fprops.submitForm()}
              >
                <h2>{tCommon("submit")}</h2>
              </div>
            )}
          </div>
        )}
      </Formik>
    </form>
  );
};

export default SignUpForm;
