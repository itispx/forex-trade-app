import React from "react";
import styles from "./SignInForm.module.scss";

import { Formik } from "formik";
import * as yup from "yup";

import queryClient from "../../../utilities/queryClient";
import { useMutation } from "react-query";
import { signInUserQuery } from "../../../queries/usersQueries";

import { toast } from "react-toastify";

import TextFormField from "../../TextFormField";
import Loading from "../../Loading";

interface Props {
  closeModal: () => void;
}

const SignInForm: React.FC<Props> = ({ closeModal }) => {
  const { mutate: signInUser, isLoading } = useMutation(signInUserQuery, {
    onSuccess: (data) => {
      if (data.status.code === 200) {
        queryClient.setQueryData("user", data.success);
        closeModal();
      }
    },
    onError: () => {
      toast.error("Something went wrong");
    },
    onSettled: () => queryClient.invalidateQueries("user"),
  });

  async function submitHandler(username: string, password: string) {
    signInUser({ username, password });
  }

  const signInSchema = yup.object({
    username: yup.string().typeError("Invalid username").required("Username is required"),
    password: yup.string().required("Password is required"),
  });

  return (
    <form>
      <Formik
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

export default SignInForm;
