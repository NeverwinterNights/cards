import React, {ChangeEvent, useState} from 'react';
import styles from "./Register.module.scss";



import { useAppSelector } from '../assets/selectors/authSelectors';
import { registerTC, RequestStatusType, SetStatusAC } from '../redux/register-reducer';
import { useDispatch } from 'react-redux';

export const Register = React.memo(() => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirm, setConfirm] = useState<string>("");
    const [inputType, setInputType] = useState<boolean>(false);

    const dispatch = useDispatch()

    const onEmailHandle = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }
    const onPasswordHandle = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }
    const onConfirmHandle = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirm(e.currentTarget.value)
    }

    const onInputTypeHandle = () => {
        setInputType(!inputType)
    }

    const onSendPasswordHandle = () => {
        dispatch(registerTC(email, password))
    }



   const status = useAppSelector<RequestStatusType>(state=> state.registerReducer.status)

    if (email || password) {
        dispatch(SetStatusAC('loading' ))
    }
    if (password === confirm) {
        dispatch(SetStatusAC('succeeded' ))
    }

    return (
      <div className={styles.body}>
        <div className={styles.main}>
            <div className={styles.title}>It-incubator</div>
            <div className={styles.subtitle}>Sign Up</div>
            <div className={styles.email}>

                <div className={styles.email__title}>Email</div>
                <input autoComplete="new-password" value={email} onChange={onEmailHandle} type="text"
                       className={styles.input}/>

            </div>
            <div className={styles.password}>
                <div className={styles.password__title}>Password</div>
                <input autoComplete="new-password" value={password} onChange={onPasswordHandle}  type={!inputType ? "password" : "text"}
                       className={styles.input}/>
                <button onClick={onInputTypeHandle} className={styles.icon}> </button>
            </div>
            <div className={styles.confirm}>
                <div className={styles.confirm__title}>Confirm password</div>
                <input autoComplete="new-password" value={confirm} onChange={onConfirmHandle}
                       type={!inputType ? "password" : "text"} className={styles.input}/>
                <button onClick={onInputTypeHandle} className={styles.icon}> </button>
            </div>

            <div className={styles.footer}>
                <button className={styles.cancel}>Cancel</button>
                <button onClick={onSendPasswordHandle} disabled={status==='loading'} className={styles.register}>Register</button>
            </div>
        </div>
      </div>
    );
});

