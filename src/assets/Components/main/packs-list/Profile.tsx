import s from "./Profile.module.scss";
import RangeSlider from "./../../mui/range-slider/RangeSlider";
import DenseTable from "./../../mui/table/Table";
import PaginationSize from "./../../mui/pagination/Pagination";
import ButtonForTable from "./../../common/button/ButtonForTable";
import profile from "./../../../images/main/profilePerson.svg";

// import ButtonForTable from "./../../../Components/common/button/ButtonForTable";

function Profile() {
  return (
    <div>
      <div className={s.wrapper}>
        <div className={s.wrapLeft}>
          <div className={s.wrapPerson}>
            <img className={s.img} src={profile} alt="" />
            <h3 className={s.subtitle}>Petr Ivanov</h3>
            <p className={s.text}>Front-end developer</p>
          </div>
          <div className={s.wrapSlider}>
            <h3 className={s.subtitleSlid}>Number of cards</h3>
            <RangeSlider />
          </div>
        </div>
        <div className={s.wrapRight}>
          <h2 className={s.title}>Packs list Petr’s</h2>
          <div className={s.wrapForm}>
            <input className={s.input} type="text" placeholder="Search..." />
          </div>
          <div className={s.table}>
            <DenseTable />
            <div className={s.wrapBottom}>
              <PaginationSize />

              <div className={s.wrapSelect}>
                <p className={s.textBottom}>Show </p>
                <select className={s.select}>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
                <p className={s.textBottom}> Cards per Page</p>
              </div>
              <ButtonForTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
