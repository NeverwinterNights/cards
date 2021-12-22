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

type userDomainType = {
	_id: string
	email: string
	rememberMe: false
	isAdmin: false
	name: string
	verified: false
	publicCardPacksCount: number
	created: string
	updated: string
	__v: number
	token: string
	tokenDeathTime: number
	avatar: string | null
}

type updateUserDomainType = {
	updatedUser: userDomainType,
	token: string
	tokenDeathTime: number
}

export type updateProfilePayloadType = { name?: string, avatar?: string }

const axiosConfig = {
	// baseURL: 'http://localhost:7542/2.0/',
	baseURL: 'https://neko-back.herokuapp.com/2.0/',
	withCredentials: true,
};

const axiosInstance = axios.create( axiosConfig );


export const api = {
	login(data: any) {
		return axiosInstance.post<userDomainType>( 'auth/login', data );
	},
	registration(body: RegistrationRequestType) {
		return axiosInstance.post<RegistrationRequestType, AxiosResponse<RegistrationResponseType>>( 'auth/register', {
			email: body.email,
			password: body.password,
		} );
	},
	authMe() {
		return axiosInstance.post<userDomainType>( 'auth/me', {} );
	},
	logOut() {
		return axiosInstance.delete<{ info: string, error?: string }>( 'auth/me', {} );
	},
	updateProfile(payload: updateProfilePayloadType) {
		return axiosInstance.put<updateUserDomainType>( 'auth/me', payload );
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
export type getPacksPayloadType = {
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
type domainPackType = {
	// id пака
	_id: string
	user_id: string
	user_name: string
	private: boolean,
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
	// more_id: string
	__v: number
}


// объект с массивом паков и пр
export type getPacksResponseType = {
	cardPacks: domainPackType[],
	page: number
	pageCount: number
	cardPacksTotalCount: number
	minCardsCount: number
	maxCardsCount: number
	token: string
	tokenDeathTime: number
}
// объект карточки
type domainCardType = {
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
	cards: domainCardType[]
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
export type getCardsPayloadType = {
	cardsPack_id: string
	cardAnswer?: string
	cardQuestion?: string
	min?: number
	max?: number
	sortCards?: string
	page?: number
	pageCount?: number
}


type createPackParamsType = {
	name?: string
	path?: string
	grade?: number
	shots?: number
	rating?: number
	// url or base64
	deckCover?: string
	private?: boolean
	type?: string
}

type createCardParamsType = {
	cardsPack_id: string
	question?: string
	answer?: string
	grade?: number
	shots?: number
	rating?: number
	// url or base64
	answerImg?: string
	// url or base64
	questionImg?: string
	// url or base64
	questionVideo?: string
	// url or base64
	answerVideo?: string
	type?: string
}

type updatePackPayloadType = {
	// id пака
	_id: string
	private?: boolean,
	name?: string
	path?: string
	rating?: number
	grade?: number
	shots?: number
}

type updateCardPayloadType = {
	// id карты
	_id: string
	question?: string
	answer?: string
	shots?: number
	rating?: number
	grade?: number
	// url or base64
	answerImg?: string
	// url or base64
	questionImg?: string
	// url or base64
	questionVideo?: string
	// url or base64
	answerVideo?: string
	type?: string
	comments?: string
}

export const cardsApi = {
	// возвращает промис с паками
	getPacks(payload = {} as getPacksPayloadType) {
		return axiosInstance.get<getPacksResponseType>( `cards/pack`, {
			params: {
				...payload,
			},
		} );
	},
	// возвращает промис c новым паком. Сделай новый запрос паков после этого запроса
	createPack(payload = {} as createPackParamsType) {
		return axiosInstance.post( 'cards/pack', { cardsPack: payload } );
	},
	// возвращает промис с удаленным паком. Сделай новый запрос паков после этого запроса
	deletePack(packId: string) {
		return axiosInstance.delete( 'cards/pack', { params: { id: packId } } );
	},
	// возвращает промис с обновленным паком. Сделай новый запрос паков после этого запроса
	updatePack(payload: updatePackPayloadType) {
		return axiosInstance.put( 'cards/pack', { cardsPack: { ...payload } } );
	},
	// возвращает промис с карточками
	getCards(payload: getCardsPayloadType) {
		return axiosInstance.get<getCardsResponseType>( `cards/card`, {
			params: {
				...payload,
			},
		} );
	},
	// возвращает промис c новой картой. Сделай новый запрос карт после этого запроса
	createCard(payload = {} as createCardParamsType) {
		return axiosInstance.post( 'cards/card', { card: payload } );
	},
	// возвращает промис с удаленной картой. Сделай новый запрос карт после этого запроса
	deleteCard(cardId: string) {
		return axiosInstance.delete( 'cards/card', { params: { id: cardId } } );
	},
	// возвращает промис с обновленной картой. Сделай новый запрос карт после этого запроса
	updateCard(payload: updateCardPayloadType) {
		return axiosInstance.put( 'cards/card', { card: { ...payload } } );
	},


};
