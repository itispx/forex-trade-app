import React from "react";
import styles from "./SignInForm.module.scss";

import { useTranslation } from "next-i18next";

import { Formik, FormikProps } from "formik";
import * as yup from "yup";

import TextFormField from "../../TextFormField";
import Loading from "../../Loading";

interface Props {
  isLoading: boolean;
  submitHandler: (username: string, password: string) => void;
  inputRef?: React.RefObject<
    FormikProps<{
      username: string;
      password: string;
    }>
  >;
}

const SignInForm: React.FC<Props> = ({ isLoading, submitHandler, inputRef }) => {
  const { t: tAuth } = useTranslation("auth");
  const { t: tCommon } = useTranslation("common");

  const signInSchema = yup.object({
    username: yup
      .string()
      .typeError(tAuth("username_invalid") as string)
      .required(tAuth("username_required") as string),
    password: yup.string().required(tAuth("password_required") as string),
  });

  return (
    <form>
      <Formik
        innerRef={inputRef}
        validationSchema={signInSchema}
        initialValues={{ username: "", password: "" }}
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

export default SignInForm;
