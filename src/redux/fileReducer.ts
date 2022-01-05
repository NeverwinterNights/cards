import {Dispatch} from "redux";
import {filesApi} from "../api/fileAPI";

export type TypeReader = {
    fileReader: string
}

export type FileType = {
    lastModified: number
    lastModifiedDate: Date
    name: string
    size: number
    type: string
    webkitRelativePath: string
}

export type InitialStateTypeFile = {
    nameFile: string
    size: number
    typeImage: string
    lastModified: number
    newFile: string
    simpleFile: any
}
type ActionType = ReturnType<typeof setFileAC> | ReturnType<typeof setFileReaderAC>
const initialState: InitialStateTypeFile & TypeReader = {
    newFile: '',
    nameFile: "",
    size: 0,
    typeImage: "",
    lastModified: 0,
    fileReader: '',
    simpleFile: {},
}

export const fileReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case "SET_FILE_READER":
            return {...state, fileReader: action.result}
        case "SET_FILE_INFORM":
            return {
                ...state,
                nameFile: action.nameFile,
                size: action.size,
                typeImage: action.typeImage,
                lastModified: new Date(action.lastModified).toDateString(),
                newFile: action.newFile,
                simpleFile: action.simpleFile
            }
        default:
            return state
    }
}

export const setFileAC = ({nameFile, size, typeImage, lastModified, newFile, simpleFile}: InitialStateTypeFile) => ({
    type: 'SET_FILE_INFORM',
    nameFile,
    size,
    typeImage,
    lastModified,
    newFile,
    simpleFile
} as const)
export const setFileReaderAC = (result: string | ArrayBuffer) => ({type: 'SET_FILE_READER', result} as const)
export const getFileTC = (nameFiles: string) => async (dispatch: Dispatch) => {
    try {
        const {data} = await filesApi.getFiles()
        const blob = new Blob([data], {type: 'image/jpeg'})
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute('download', nameFiles)
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (err) {
        console.log('this is err')
    }
}
export const sendFileTC = (file: any) => async (dispatch: Dispatch) => {
    try {
        const res = await filesApi.setFiles(file)
        console.log(res)
    } catch (err) {
        console.log('error')
    }
}