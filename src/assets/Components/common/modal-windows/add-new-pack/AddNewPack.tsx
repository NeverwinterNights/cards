import React from 'react';
import s from "./AddNewPack.module.scss";
import cross from "../../../../images/modal/cross.png";

function AddNewPack() {
  return (
    <div className={s.wrapper}>
      <div className={s.wrap}>
        <div className={s.header}>
          <h2 className={s.title}>Add new pack</h2>
          <img className={s.img} src={cross} alt="" />
        </div>
        <p className={s.text}>Name pack</p>
        <input type="text" className={s.input} />
        <div className={s.wrapBtn}>
          <button className={s.btnCancel}>Cancel</button>
          <button className={s.btnSave}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default AddNewPack;
