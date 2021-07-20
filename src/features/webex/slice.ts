import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { LoginStatus, WebexConnectionStatus, WebexState } from '../../model/model'

const blankState = {
	accessToken: '',
	expiresIn: 0,
	refreshToken: '',
	refreshTokenExpiresIn: 0,
	shareOn: false,
	showGrantWarning: false,
}
const intersessionLoginData = blankState

const initialState: WebexState = {
	loginData: intersessionLoginData,
	loginStatus: intersessionLoginData.accessToken
		? 'logged in'
		: 'not logged in',
	connectionStatus: 'INACTIVE',
	callStatusLocal: '',
	callStatusRemote: '',
	shareOn: false,
	showGrantWarning: false,
	destinationWebexId: '',
}

export const slice = createSlice({
	name: 'webex',
	initialState,
	reducers: {
		setWebexAuth: (state, { payload }: PayloadAction<string>) => {
			state.loginData.accessToken = payload
			state.loginStatus = payload ? 'logged in' : 'not logged in'
		},
		setWebexLoginStatus: (state, { payload }: PayloadAction<LoginStatus>) => {
			state.loginStatus = payload
		},
		setConnectionStatus: (
			state,
			{
				payload,
			}: PayloadAction<{
				connectionStatus: WebexConnectionStatus
				prevConnectionStatus: WebexConnectionStatus
			}>,
		) => {
			state.connectionStatus = payload.connectionStatus
			state.prevConnectionStatus = payload.prevConnectionStatus
		},
		setDestinationWebexId: (state, { payload }: PayloadAction<string>) => {
			state.destinationWebexId = payload
		},
		_setShareOn: (state, { payload }: PayloadAction<boolean>) => {
			state.shareOn = payload
		},
		delWebexAuth: _ => ({
			loginData: blankState,
			loginStatus: 'not logged in',
			connectionStatus: 'INACTIVE',
			callStatusLocal: '',
			callStatusRemote: '',
			shareOn: false,
			showGrantWarning: false,
			destinationWebexId: '',
		}),
		setCallStatus: (
			state,
			{
				payload,
			}: PayloadAction<{ callStatus: string; type: 'local' | 'remote' }>,
		) => {
			const { callStatus, type } = payload
			state[
				type === 'local' ? 'callStatusLocal' : 'callStatusRemote'
			] = callStatus
		},
		setShowGrantWarning: (state, { payload }: PayloadAction<boolean>) => {
			state.showGrantWarning = payload
		},
	},
})

export default slice.reducer
