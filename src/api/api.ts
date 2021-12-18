import axios, { AxiosResponse } from 'axios';
import { RegistrationRequestType, RegistrationResponseType } from '../redux/register-reducer';


export enum Status {
	loading = 'loading',
	error = 'error',
	ready = 'ready'
}

type SendMessageType = {
	answer: boolean
	html: boolean
	info: string
	success: boolean
}

export type AuthDomainDataType = {
	avatar: string
	email: string
	name: string
	publicCardPacksCount: number
	_id: string
}

const axiosConfig = {
	// baseURL: 'http://localhost:7542/2.0/',
	baseURL: 'https://neko-back.herokuapp.com/2.0/',
	withCredentials: true,
};

const axiosInstance = axios.create( axiosConfig );


export const api = {
	login(data: any) {
		return axiosInstance.post<AuthDomainDataType>( 'auth/login', data );
	},
	registration(body: RegistrationRequestType) {
		return axiosInstance.post<RegistrationRequestType, AxiosResponse<RegistrationResponseType>>( 'auth/register', {
			email: body.email,
			password: body.password,
		} );
	},
	authMe() {
		return axiosInstance.post<AuthDomainDataType>( 'auth/me', {} );
	},
	logOut() {
		return axiosInstance.delete<{ info: string, error?: string }>( 'auth/me', {} );
	},
};
export const changePasswordAPI = {
	sendMessagePassword(email: string) {
		return axiosInstance.post<SendMessageType>( 'auth/forgot', {
			email,
			from: 'test-front-admin <t9371100211@gmail.com>',
			message: `<div><h1><a href='https://alfilip.github.io/cards/#/set-new-password/$token$'>change password</h1></div>`,
		} );
	},
	newPassword(password: string, token: string) {
		return axiosInstance.post( `auth/set-new-password`, {
			password,
			resetPasswordToken: token,
		} );
	},
};
// объект с необязательными параметрами
type getPacksPayloadType = {
	packName?: string
	min?: number
	max?: number
	// 0 | 1 - направление сортировки
	sortPacks?: string
	// номер страницы
	page?: number
	// количество паков
	pageCount?: number
	user_id?: string
}
// объект пака
type packType = {
	// id пака
	_id: string
	user_id: string
	user_name: string
	private: false,
	name: string
	path: string
	grade: number
	shots: number
	// количество карт в паке
	cardsCount: number
	type: string
	rating: number
	created: string
	updated: string
	more_id: string
	__v: number
}
// объект с массивом паков и пр
type getPacksResponseType = {
	cardPacks: packType[],
	page: number
	pageCount: number
	cardPacksTotalCount: number
	minCardsCount: number
	maxCardsCount: number
	token: string
	tokenDeathTime: number
}
// объект карточки
type cardType = {
	_id: string
	cardsPack_id: string
	user_id: string
	answer: string
	question: string
	grade: number
	shots: number
	type: string
	rating: number
	created: string
	updated: string
	__v: number
}
// объект с массивом карточек и прочей инфой
type getCardsResponseType = {
	cards: cardType[]
	cardsTotalCount: number
	maxGrade: number
	minGrade: number
	packUserId: string
	page: number
	pageCount: number
	token: string
	tokenDeathTime: number
}

// объект с одним обязательным параметром cardsPack_id и кучей необязательных параметров
type getCardsPayloadType = {
	cardsPack_id: string
	cardAnswer?: string
	cardQuestion?: string
	min?: number
	max?: number
	sortCards?: string
	page?: number
	pageCount?: number
}


export const cardsApi = {
	// возвращает промис с паками
	getPacks(payload: getPacksPayloadType) {
		return axiosInstance.get<getPacksResponseType>( `cards/pack`, {
			params: {
				...payload,
			},
		} );
	},
	// возвращает промис с карточками
	getCards(payload: getCardsPayloadType) {
		return axiosInstance.get<getCardsResponseType>( `cards/card`, {
			params: {
				...payload,
			},
		} );
	},
};
