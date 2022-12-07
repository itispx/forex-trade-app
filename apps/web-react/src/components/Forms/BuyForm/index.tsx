import React from "react";
import styles from "./BuyForm.module.scss";

import { Formik, FormikProps } from "formik";
import * as yup from "yup";

import TextFormField from "../../TextFormField";
import Loading from "../../Loading";

interface Props {
  submitHandler: () => void;
  isLoading: boolean;
  inputRef?: (
    node: FormikProps<{
      amount: number;
    }>,
  ) => void;
}

const BuyForm: React.FC<Props> = ({ submitHandler, isLoading, inputRef }) => {
  const buySchema = yup.object({
    amount: yup
      .number()
      .typeError("Invalid amount")
      .min(0.1, "Minimal amount of 0.1")
      .required("Amount is required"),
  });

  return (
    <form>
      <Formik
        innerRef={inputRef}
        validationSchema={buySchema}
        initialValues={{ amount: 1 }}
        onSubmit={submitHandler}
      >
        {(fprops) => (
          <div className={styles["container"]}>
            <TextFormField
              id="amount"
              name="amount"
              type="number"
              placeholder="Amount"
              value={fprops.values.amount}
              onChange={fprops.handleChange("amount")}
              onBlur={fprops.handleBlur("amount")}
              touched={fprops.touched.amount}
              errors={fprops.errors.amount}
              inputProps={{ step: 0.1, min: 0.01 }}
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
                <h2>Submit</h2>
              </div>
            )}
          </div>
        )}
      </Formik>
    </form>
  );
};

export default BuyForm;
