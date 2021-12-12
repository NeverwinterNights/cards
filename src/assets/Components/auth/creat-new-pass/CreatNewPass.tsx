import s from "./CreatNewPass.module.scss";
import FormPropsTextFieldsEmail from "../../mui/text-field/TextFieldEmail";

function CreatNewPass() {
  // const vlas = "vlas";
  return (
    <div className={s.login}>
      <div className={s.wrap}>
        <form className={s.form}>
          <h2 className={s.title}>It-incubator</h2>
          <h3 className={s.subtitle}>Create new password</h3>
          <div className={s.content}>
            <FormPropsTextFieldsEmail />
            <p className={s.textInfo}>
              Create new password and we will send you further instructions to
              email
            </p>
          </div>
          <button className={s.btn}>Create new password</button>
        </form>
      </div>
    </div>
  );
}

export default CreatNewPass;
