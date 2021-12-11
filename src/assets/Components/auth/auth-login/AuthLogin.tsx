import s from "./AuthLogin.module.scss";

function AuthLogin() {
  // const vlas = "vlas";
  return (
    <div className={s.login}>
      <div className={s.wrap}>
        <form className={s.form}>
          <h2 className={s.title}>It-incubator</h2>
          <h3 className={s.subtitle}>Sign In</h3>
          <p className={s.textTop}>Email</p>
          <input className={s.email} type="email" />
          <p className={s.textBottom}>Password</p>
          <input className={s.password} type="password" />
          <a className={s.linkNewPass} href="#">
            Forgot Password
          </a>
          <button className={s.btn}>Login</button>
        </form>
        <div className={s.wrapLink}>
          <a className={s.linkNewAcc} href="#">
            Don’t have an account?
          </a>
          <a className={s.linkReg} href="#">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}

export default AuthLogin;
