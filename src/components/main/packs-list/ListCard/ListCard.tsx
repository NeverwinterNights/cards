import s from "./ListCard.module.scss";
import arrow from "../../../images/main/arrow.svg";
import DenseTableList from "../../../mui/table-list-card/TableListCard";
import CustomizedRating from "../../../mui/rating/Rating";

function PackListNew() {
  return (
    <div>
      <div className={s.wrapper}>
        <div className={s.wrap}>
          <div className={s.head}>
            <a className={s.link} href="#">
              <img className={s.img} src={arrow} alt="" />
            </a>
            <h2 className={s.title}>Pack Name</h2>
          </div>
          <div className={s.wrapForm}>
            <input className={s.input} type="text" placeholder="Search..." />
          </div>
          <DenseTableList />
          <CustomizedRating />
        </div>
      </div>
    </div>
  );
}

export default PackListNew;
