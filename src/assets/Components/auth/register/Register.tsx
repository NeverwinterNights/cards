import React, { ChangeEvent, useState } from "react";
import styles from "./Register.module.scss";
import FormPropsTextFieldsEmail from "./../../mui/text-field/TextFieldEmail";

export const Register = React.memo(() => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [inputType, setInputType] = useState<boolean>(false);

  const onEmailChandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };
  const onPasswordChandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };
  const onConfirmChandler = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirm(e.currentTarget.value);
  };

  const onInputTypeChandler = () => {
    setInputType(!inputType);
  };

  return (
    <div className={styles.registerWrap}>
      <div className={styles.main}>
        <div className={styles.title}>It-incubator</div>
        <div className={styles.subtitle}>Sign Up</div>
        <div className={styles.email}>
          {/* <div className={styles.email__title}>Email</div> */}
          <FormPropsTextFieldsEmail />
          {/* <input
            autoComplete={"new-password"}
            value={email}
            onChange={onEmailChandler}
            type="text"
            className={styles.input}
          /> */}
        </div>
        <div className={styles.password}>
          <div className={styles.password__title}>Password</div>
          <input
            autoComplete="new-password"
            value={password}
            onChange={onPasswordChandler}
            type={!inputType ? "password" : "text"}
            className={styles.input}
          />
          <button
            onClick={onInputTypeChandler}
            className={styles.icon}
          ></button>
        </div>
        <div className={styles.confirm}>
          <div className={styles.confirm__title}>Confirm password</div>
          <input
            autoComplete={"new-password"}
            value={confirm}
            onChange={onConfirmChandler}
            type={!inputType ? "password" : "text"}
            className={styles.input}
          />
          <button
            onClick={onInputTypeChandler}
            className={styles.icon}
          ></button>
        </div>

        <div className={styles.footer}>
          <button className={styles.cancel}>Cancel</button>
          <button className={styles.register}>Register</button>
        </div>
      </div>
    </div>
  );
});
