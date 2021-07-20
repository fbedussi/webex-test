import { WebexConnectionStatus } from '../../model/model'
import { AppThunk, AppThunkPromise } from '../../model/types'
import { selectShareOn, selectWebexLoginData } from './selectors'
import { slice } from './slice'
import { bindUiElements, joinMeeting } from './utils'

let webex: any = undefined
let currentMeeting: any = undefined

const connect = ({
	selfView,
	remoteViewVideo,
	remoteViewAudio,
	destination,
}: {
	selfView?: React.RefObject<HTMLVideoElement>
	remoteViewVideo: React.RefObject<HTMLVideoElement>
	remoteViewAudio: React.RefObject<HTMLAudioElement>
	destination: string
}): AppThunk => async (dispatch, getState) => {
	if (currentMeeting) {
		return
	}

	if (!webex) {
		const state = getState()
		const token = selectWebexLoginData(state).accessToken
		webex = window.Webex.init({
			credentials: {
				access_token: token,
			},
		})
		webex.config.logger.level = 'debug'
	}

	webex.meetings
		.register()
		.then(() => {
			webex.meetings.create(destination).then((meeting: any) => {
				currentMeeting = meeting

				window.addEventListener('beforeunload', function (e) {
					// Cancel the event
					e.preventDefault() // If you prevent default behavior in Mozilla Firefox prompt will always be shown
					// Chrome requires returnValue to be set
					e.returnValue = ''

					if (currentMeeting) {
						typeof currentMeeting.leave === 'function' && currentMeeting.leave()
						typeof currentMeeting.unregister === 'function' &&
							currentMeeting.unregister()
						currentMeeting = undefined
					}
				})

				meeting.on('error', (err: Error) => {
					console.error(err)
				})

				meeting.on(
					'meeting:stateChange',
					(props: {
						payload: {
							currentState: WebexConnectionStatus
							previousState: WebexConnectionStatus
						}
					}) => {
						props.payload.currentState &&
							dispatch(
								slice.actions.setConnectionStatus({
									connectionStatus: props.payload.currentState,
									prevConnectionStatus: props.payload.previousState,
								}),
							)
					},
				)

				meeting.on('meeting:startedSharingLocal', () => {
					dispatch(slice.actions._setShareOn(true))
				})
				meeting.on('meeting:stoppedSharingLocal', () => {
					dispatch(slice.actions._setShareOn(false))
				})

				bindUiElements({
					meeting,
					selfView,
					remoteViewVideo,
					remoteViewAudio,
				})

				meeting.members.on('members:update', (delta: any) => {
					const { full: membersData } = delta
					const memberIDs = Object.keys(membersData)

					memberIDs.forEach(memberID => {
						const memberObject = membersData[memberID]

						if (memberObject.isUser) {
							if (memberObject.isSelf) {
								dispatch(
									slice.actions.setCallStatus({
										callStatus: memberObject.status,
										type: 'local',
									}),
								)
							} else {
								dispatch(
									slice.actions.setCallStatus({
										callStatus: memberObject.status,
										type: 'remote',
									}),
								)
							}
						}
					})
				})

				return joinMeeting(meeting)
			})
		})
		.catch((error: Error) => {
			console.error(error)
		})
}

const reJoinCurrentMeeting = ({
	selfView,
	remoteViewVideo,
	remoteViewAudio,
	destination,
}: {
	selfView?: React.RefObject<HTMLVideoElement>
	remoteViewVideo: React.RefObject<HTMLVideoElement>
	remoteViewAudio: React.RefObject<HTMLAudioElement>
	destination: string
}): AppThunk => dispatch => {
	if (!currentMeeting) {
		return dispatch(
			connect({
				selfView,
				remoteViewVideo,
				remoteViewAudio,
				destination,
			}),
		)
	}

	bindUiElements({
		meeting: currentMeeting,
		selfView,
		remoteViewVideo,
		remoteViewAudio,
	})
}

const toggleAudio = (): AppThunkPromise => dispatch => {
	if (!currentMeeting) {
		return Promise.resolve()
	}
	const result = currentMeeting.isAudioMuted()
		? currentMeeting.unmuteAudio()
		: currentMeeting.muteAudio()
	return result
}
const toggleVideo = (): AppThunkPromise => dispatch => {
	if (!currentMeeting) {
		return Promise.resolve()
	}
	const result = currentMeeting.isVideoMuted()
		? currentMeeting.unmuteVideo()
		: currentMeeting.muteVideo()
	return result
}

const hangup = (): AppThunk => dispatch => {
	if (currentMeeting) {
		typeof currentMeeting.leave === 'function' && currentMeeting.leave()
		typeof currentMeeting.unregister === 'function' &&
			currentMeeting.unregister()
		currentMeeting = undefined
	}
}

const unregister = (): AppThunk => dispatch => {
	if (currentMeeting && typeof currentMeeting.unregister === 'function') {
		currentMeeting.unregister()
		currentMeeting = undefined
	}
}

// Waits for the meeting to be media update ready
const waitForMediaReady = (meeting: any): Promise<void> => {
	return new Promise((resolve, reject) => {
		if (meeting.canUpdateMedia()) {
			resolve()
		} else {
			let retryAttempts = 0

			const retryInterval = setInterval(() => {
				retryAttempts += 1

				if (meeting.canUpdateMedia()) {
					clearInterval(retryInterval)
					resolve()
				}
				// If we can't update our media after 15 seconds, something went wrong
				else if (retryAttempts > 15) {
					clearInterval(retryInterval)
					reject()
				}
			}, 1000)
		}
	})
}

const toggleShare = (): AppThunkPromise => (dispatch, getState) => {
	if (!currentMeeting) {
		return Promise.resolve()
	}
	return new Promise((resolve, reject) => {
		const shareOn = selectShareOn(getState())
		waitForMediaReady(currentMeeting)
			.then(() => {
				if (shareOn) {
					currentMeeting.stopShare()
				} else {
					currentMeeting.shareScreen()
				}
				return resolve()
			})
			.catch(() => {
				return reject()
			})
	})
}

const webexActions = {
	...slice.actions,
	connect,
	reJoinCurrentMeeting,
	hangup,
	unregister,
	toggleAudio,
	toggleVideo,
	toggleShare,
}

export default webexActions

export const selectVideoOn = () =>
	currentMeeting && !currentMeeting.isVideoMuted()

export const selectAudioOn = () =>
	currentMeeting && !currentMeeting.isAudioMuted()
