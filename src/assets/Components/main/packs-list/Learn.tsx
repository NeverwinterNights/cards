import s from "./Learn.module.scss";

function Learn() {
  return (
    <div>
      <div className={s.wrapper}>
        <div className={s.wrap}>
          <h3 className={s.subtitle}>Learn “Pack Name”</h3>
          <div className={s.content}>
            <p className={s.text}>
              <strong>Question:</strong> “How "This" works in JavaScript?”
            </p>

            <div className={s.wrapBtn}>
              <button className={s.btnCancel}>Cancel</button>
              <button className={s.btnSave}>Show answer</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Learn;
