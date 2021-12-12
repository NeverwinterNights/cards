import s from "./Main.module.scss";
import TabPanel from "./../mui/floatin-button/FloatinButton";

function Main() {
  return (
    <div className={s.wrapper}>
      <header className={s.header}>
        <h2 className={s.logo}>It-incubator</h2>
        <TabPanel />
      </header>
      <section className={s.content}></section>
    </div>
  );
}

export default Main;
