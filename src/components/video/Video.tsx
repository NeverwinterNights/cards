import React, { ChangeEvent, useState } from 'react';
import styles from './Video.module.scss';


export const Video =React.memo(() => {

  const [inputValue, setInputValue] = useState<boolean>(false);

  const onInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.checked)
  }

  return (
        <div className={styles.main}>
            <h2>Video</h2>
          <div className={styles.control__inp}>
            <div>controls</div>
            <input type='checkbox' checked={inputValue} onChange={onInputHandler} />
          </div>
          <div className={styles.video}>
            <video src='' controls={inputValue}>

            <track default src={""} kind="captions"/>
            </video>
          </div>
          <div className={styles.controls}>
            <button className={styles.button}>Play</button>
            <button className={styles.button}>Pause</button>
            <button className={styles.button}>Full Screen</button>
            <button className={styles.button}>Volume Up</button>
            <button className={styles.button}>Volume Down</button>
            <button className={styles.button}>Current Time Down</button>
            <button className={styles.button}>Current Time Up</button>
            <button className={styles.button}>Stop</button>
            <button className={styles.button}>Playback Rate Up</button>
            <button className={styles.button}>Playback Rate Down</button>
            <button className={styles.button}>Width 100</button>
          </div>
          <div className={styles.footer}>
            <div className={styles.title}>Duration</div>
            <div className={styles.duration_value}> </div>
            <div className={styles.title}>Current Time</div>
            <div className={styles.curren_time_value}> </div>
          </div>
        </div>
    );
});

