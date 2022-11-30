import React from "react";
import styles from "./SignUpForm.module.scss";

import { Formik } from "formik";
import * as yup from "yup";

import queryClient from "../../../utilities/queryClient";
import { useMutation } from "react-query";
import { signUpUserQuery } from "../../../queries/usersQueries";

import { toast } from "react-toastify";

import TextFormField from "../../TextFormField";
import Loading from "../../Loading";

const SignUpForm: React.FC = () => {
  const { mutate: signUpUser, isLoading } = useMutation(signUpUserQuery, {
    onSuccess: (data) => {
      if (data.status.code === 201) {
        console.log("sign up, token:", data.success.token);
        queryClient.setQueryData("user", data.success);
      }
    },
    onError: () => {
      toast.error("Something went wrong", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    },
    onSettled: () => queryClient.invalidateQueries("user"),
  });

  async function submitHandler(username: string, password: string) {
    signUpUser({ username, password });
  }

  const signUpSchema = yup.object({
    username: yup.string().typeError("Invalid username").required("Username is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Must have at least 6 characters")
      .matches(/^(?=.*[A-Za-z])/, "Password must contain a letter")
      .matches(/^(?=.*[(0-9])/, "Password must contain a number"),
    confirmPassword: yup
      .string()
      .required("Please confirm your password")
      .oneOf([yup.ref("password"), null], "Password must match"),
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
            <TextFormField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
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
              <div className={styles["submit"]} onClick={() => fprops.submitForm()}>
                <h2>Submit</h2>
              </div>
            )}
          </div>
        )}
      </Formik>
    </form>
  );
};

export default SignUpForm;
