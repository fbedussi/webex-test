import { RootState } from '../../model/model'

export const selectWebexLoginData = (state: RootState) => state.webex.loginData

export const selectWebexToken = (state: RootState) =>
	state.webex.loginData.accessToken

export const selectWebexLoginStatus = (state: RootState) =>
	state.webex.loginStatus

export const selectConnectionStatus = (state: RootState) =>
	state.webex.connectionStatus

export const selectPrevConnectionStatus = (state: RootState) =>
	state.webex.prevConnectionStatus

export const selectCallStatusLocal = (state: RootState) =>
	state.webex.callStatusLocal

export const selectCallStatusRemote = (state: RootState) =>
	state.webex.callStatusRemote

export const selectShareOn = (state: RootState) => state.webex.shareOn

export const selectShowGrantWarning = (state: RootState) =>
	state.webex.showGrantWarning

export const selectDestinationWebexId = (state: RootState) => state.webex.destinationWebexId
