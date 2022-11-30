import React from "react";
import styles from "./SignInForm.module.scss";

import { Formik } from "formik";
import * as yup from "yup";

import TextFormField from "../../TextFormField";

const SignInForm: React.FC = () => {
  const signInSchema = yup.object({
    username: yup.string().typeError("Invalid username").required("Username is required"),
    password: yup.string().required("Password is required"),
  });

  return (
    <form>
      <Formik
        validationSchema={signInSchema}
        initialValues={{ username: "", password: "" }}
        onSubmit={(values) => console.log(values)}
      >
        {(fprops) => (
          <div className={styles["container"]}>
            <TextFormField
              id="username"
              name="username"
              type="text"
              placeholder="Username"
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
              placeholder="Password"
              value={fprops.values.password}
              onChange={fprops.handleChange("password")}
              onBlur={fprops.handleBlur("password")}
              touched={fprops.touched.password}
              errors={fprops.errors.password}
            />

            <div className={styles["submit"]} onClick={() => fprops.submitForm()}>
              <h2>Submit</h2>
            </div>
          </div>
        )}
      </Formik>
    </form>
  );
};

export default SignInForm;
