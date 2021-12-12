import s from "./PackList.module.scss";
import RangeSlider from "./../../mui/range-slider/RangeSlider";

function PackList() {
  return (
    <div className={s.wrapper}>
      <div className={s.wrapLeft}>
        <h3 className={s.subtitle}>Show packs cards</h3>
        <div className={s.wrapBtn}>
          <button className={s.buttonLeft}>My</button>
          <button className={s.buttonRight}>All</button>
        </div>
        <h3 className={s.subtitleSlid}>Number of cards</h3>
        <RangeSlider />
      </div>
      <div className={s.wrapRight}>
        <h2>Packs list</h2>
        <div>
          <input type="text" />
          <button>Add new pack</button>
        </div>
      </div>
    </div>
  );
}

export default PackList;
