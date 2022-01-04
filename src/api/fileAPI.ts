import axios from "axios";

const instance = axios.create({
    baseURL: 'https://dry-forest-56016.herokuapp.com',
    // withCredentials: true
})

export const filesApi = {
    getFiles() {
        return instance.get('/file')
    },
    setFiles(file: any) {
        return instance.post(`/file`, {myFile: file})
    }
}