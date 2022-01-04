import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import s from './Profile.module.scss';
import RangeSlider from '../../../mui/range-slider/RangeSlider';
import {DenseTable} from '../../../mui/table/TableNew';
import {useAppSelector} from '../../../../redux/store';
import {
    isLoading,
    maxCardsInPackNumber,
    minCardsInPackNumber,
    selectLoginData,
} from '../../../../assets/selectors/authSelectors';
import {createPack, getPacks} from '../../../../redux/packs-reducer';
import {PaginationPacksContainer} from '../../../mui/pagination/PaginationPacksContainer';
import {getFileTC, InitialStateTypeFile, sendFileTC, TypeReader} from "../../../../redux/fileReducer";
import {filesApi} from "../../../../api/fileAPI";

const defaultAva = 'https://via.placeholder.com/150';

// import ButtonForTable from "./../../../Components/common/button/ButtonForTable";

function Profile() {
    const dispatch = useDispatch();
    const {name, avatar, _id} = useAppSelector(selectLoginData);
    const {currentUserId} = useParams();
    const isLoadingStatus = useAppSelector(isLoading);
    const {
        nameFile,
        size,
        typeImage,
        lastModified,
        newFile,
        fileReader,
        simpleFile
    } = useAppSelector<InitialStateTypeFile & TypeReader>(state => state.fileReducer)
    console.log(fileReader)
    const [addPackValue, setAddPackValue] = useState('');
    const [search, setSearch] = useState<string>('');
    const min = useAppSelector(minCardsInPackNumber);
    const max = useAppSelector(maxCardsInPackNumber);
    const [textSave, setTextSave] = useState('')

    const addNewPackClickHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        _id &&
        addPackValue &&
        dispatch(createPack(addPackValue, currentUserId || _id));
        setAddPackValue('');
    };
    const searching = () => {
        if (_id) {
            dispatch(
                getPacks({
                    user_id: currentUserId ? currentUserId : _id,
                    packName: search,
                    min, // принимает значения для поиска из range slider
                    max, // принимает значения для поиска из range slider
                }),
            );
        }
    };
    const writeFile = (fileName: string, text: string) => {
        const link = document.createElement("a");
        link.href = `data:text/plain;content-disposition=attachment;filename=file,${text}`;
        link.download = fileName;
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handlerSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.currentTarget.value);
    };

    const getImage = () => {
        dispatch(getFileTC('wtf'))
    }

    const sendImage = () => {
        const formData = new FormData()
        formData.append('myFile', simpleFile)
        dispatch(sendFileTC(formData))
    }

    const user_id = currentUserId ? currentUserId : _id;

    return (
        <div
            style={
                isLoadingStatus === 'loading'
                    ? {pointerEvents: 'none'}
                    : {pointerEvents: 'auto'}
            }
        >
            <div className={s.wrapper}>
                <div className={s.wrapLeft}>
                    <div className={s.wrapPerson}>
                        <img className={s.img} src={newFile ? newFile : defaultAva} alt=''/>
                        <h3 className={s.subtitle}>{name}</h3>
                        {_id === currentUserId ||
                        (!currentUserId && (
                            <Link to={'/edit-profile'}>
                                <button className={s.btnEditProfile}>Edit Profile</button>
                            </Link>
                        ))}
                        <p>name: {nameFile}</p>
                        <p>type: {typeImage}</p>
                        <p>size: {size} kb</p>
                        <p>lastModified: {lastModified}</p>
                        {fileReader ? <pre>{fileReader}</pre> : null}
                        <textarea placeholder={'writee....'} className={s.textAr} value={textSave}
                                  onChange={(e) => setTextSave(e.currentTarget.value)} rows={10}
                                  cols={45} name="text"/>
                        <div className={s.buttons}>
                            <button onClick={() => writeFile('Text.txt', textSave + '\r\n' + fileReader)}>save</button>
                            <button onClick={sendImage}>send</button>
                            <button onClick={getImage}>get</button>
                        </div>
                    </div>
                    <div className={s.wrapSlider}>
                        <h3 className={s.subtitleSlid}>Number of cards</h3>
                        <RangeSlider/>
                    </div>
                </div>
                <div className={s.wrapRight}>
                    <h2 className={s.title}>{`${name} Packs list`}</h2>
                    <div className={s.wrapForm}>
                        <form className={s.wrapForm} onSubmit={addNewPackClickHandler}>
                            <input
                                className={s.input}
                                value={addPackValue}
                                onChange={(e) => setAddPackValue(e.currentTarget.value)}
                                placeholder='Type here'
                            />
                            <button className={s.button}>Add new pack</button>
                        </form>
                        <div className={s.wrapForm}>
                            <input
                                className={s.input}
                                value={search}
                                onChange={handlerSearch}
                                type='text'
                                placeholder='Search...'
                            />
                            <button className={s.button} onClick={searching}>
                                Search
                            </button>
                        </div>
                    </div>
                    <div className={s.table}>
                        <DenseTable user_id={user_id || ''}/>
                        <div className={s.wrapBottom}>
                            <PaginationPacksContainer/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
