import s from "./Main.module.scss";
import packs from "./../../images/main/packs.svg";
import profile from "./../../images/main/profile.svg";
import PackList from "./packs-list/PacksList";
import PackListNew from "./packs-list/PacksListNew";
import CardInfo from "./packs-list/CardInfo";
import ListCard from "./packs-list/ListCard";
import Profile from "./packs-list/Profile";
import Learn from "./packs-list/Learn";
import LearnQuestionAnswer from "./packs-list/LearnQuestionAnswer";

function Main() {
  return (
    <div className={s.wrapper}>
      <header className={s.header}>
        <div className={s.container}>
          <h2 className={s.logo}>It-incubator</h2>
          <div className={s.wrapBtn}>
            <button className={s.BtnLeft}>
              <img className={s.iconPacks} src={packs} alt="" />
              <p>Packs list</p>
            </button>
            <button className={s.BtnRight}>
              <img className={s.iconProfile} src={profile} alt="" />
              <p>Profile</p>
            </button>
          </div>
        </div>
      </header>
      <section className={s.content}>
        <PackList />
        <PackListNew />
        <CardInfo />
        <ListCard />
        <Profile />
        <Learn />
        <LearnQuestionAnswer />
      </section>
    </div>
  );
}

export default Main;
