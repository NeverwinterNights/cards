import s from "./ButtonForTable.module.scss";

function ButtonForTable() {
  return (
    <div className={s.wrapper}>
      <div className={s.wrapBtn}>
        <button className={s.btnRed}>Delete</button>
        <button className={s.btnEdit}>Edit</button>
      </div>
      <button className={s.btnLern}>Learn</button>
    </div>
  );
}

export default ButtonForTable;
