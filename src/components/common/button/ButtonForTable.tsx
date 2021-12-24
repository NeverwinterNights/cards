import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {TextField} from "@mui/material";

import s from './ButtonForTable.module.scss';
import {useAppSelector} from '../../../redux/store';
import {selectAutorisedUserId} from '../../../assets/selectors/authSelectors';
import {deletePackTC, packType, updatePackTC} from '../../../redux/packs-reducer';


type ButtonForTablePropsType = {
    packId: string
    ownerId: string
    m: packType
}

function ButtonForTable({
                            m,
                            packId,
                            ownerId,
                        }: ButtonForTablePropsType) {
    const autorisedUserId = useAppSelector(selectAutorisedUserId);
    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [value, setValue] = useState<string>('')
    const deleteHandler = () => {
        dispatch(deletePackTC(packId, ownerId));
    };
    const setNewName = () => {
        dispatch(updatePackTC(m, value, packId))
    }

    return (
        <div className={s.wrapper}>
            {autorisedUserId === ownerId
            &&
            <div className={s.wrapBtn}>
                <button className={s.btnRed} onClick={deleteHandler}>Delete</button>
                {isEdit ? <TextField id="standard-multiline-flexible"
                                     label="new name..."
                                     value={value}
                                     onBlur={setNewName}
                                     onChange={(e) => setValue(e.currentTarget.value)}
                                     variant="standard"/> :
                    <button className={s.btnEdit} onClick={() => setIsEdit(true)}>Edit</button>}
            </div>}
            <button className={s.btnLern}>Learn</button>
        </div>
    );
}

export default ButtonForTable;
