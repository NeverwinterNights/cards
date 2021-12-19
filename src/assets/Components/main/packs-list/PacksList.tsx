import s from "./PackList.module.scss";
import RangeSlider from "./../../mui/range-slider/RangeSlider";
import DenseTable from "./../../mui/table/Table";
import PaginationSize from "./../../mui/pagination/Pagination";
import DeletePack from "./../../common/modal-windows/delete-pack/DeletePack";
import AddNewPack from "./../../common/modal-windows/add-new-pack/AddNewPack";
import ButtonForTable from "./../../common/button/ButtonForTable";

// import ButtonForTable from "./../../../Components/common/button/ButtonForTable";

function PackList() {
  return (
    <div>
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
          <h2 className={s.title}>Packs list</h2>
          <div className={s.wrapForm}>
            <input className={s.input} type="text" placeholder="Search..." />
            <button className={s.button}>Add new pack</button>
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
      <DeletePack />
      <AddNewPack />
    </div>
  );
}

export default PackList;
