import React, { useEffect, useRef, useState } from 'react'
import Draggable from 'react-draggable'
import { useDispatch, useSelector } from 'react-redux'
import { ResizableBox } from 'react-resizable'
import styled from 'styled-components'

import { pxToRem } from '../../libs/style'
import { isMobile } from '../../libs/utils'
import { TDispatch } from '../../model/types'
import Button from '../../styleguide/buttons/Button'
import IconButton from '../../styleguide/buttons/IconButton'
import Dialog from '../../styleguide/dialog/Dialog'
import DialogActions from '../../styleguide/dialog/DialogActions'
import DialogContent from '../../styleguide/dialog/DialogContent'
import DialogContentText from '../../styleguide/dialog/DialogContentText'
import CloseIcon from '../../styleguide/icons/CloseIcon'
import DragIcon from '../../styleguide/icons/DragIcon'
import ExpandIcon from '../../styleguide/icons/ExpandIcon'
import MicIcon from '../../styleguide/icons/MicIcon'
import ScreenShareIcon from '../../styleguide/icons/ScreenShareIcon'
import VideoIcon from '../../styleguide/icons/VideoIcon'
import theme from '../../styleguide/theme'
import permissionsActions from '../permissions/actions'
import { selectMediaGrants } from '../permissions/selectors'
import actions, { selectAudioOn, selectVideoOn } from './actions'
import {
  selectConnectionStatus, selectDestinationWebexId, selectPrevConnectionStatus,
  selectShareOn, selectShowGrantWarning
} from './selectors'
import { slice } from './slice'

const videoH = 180

const Card = styled.div`
	position: fixed;
	top: 0rem;
	right: 0rem;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 10000;
`

const CardHeader = styled.div`
	color: ${theme.palette.common.black};
	width: 100%;
	background-color: ${theme.palette.common.white};
	display: flex;
	justify-content: flex-end;
	opacity: 0.8;
`

const CardContent = styled.div`
	padding: ${pxToRem(theme.spacing(2))}rem;
	display: flex;
	align-items: flex-start;
	flex-direction: column;
`

const DragIconStyled = styled(DragIcon)`
	width: 1rem;
	height: 1rem;
	margin: 0.5rem;
`

const WebexVideocallContainer = styled.div`
	display: flex;
	align-items: flex-start;
	width: 100%;
`

const WebexCallback = styled.div`
	display: flex;
	flex-direction: row;
	margin: 0 auto;
	color: ${theme.palette.common.white};
	font-size: ${pxToRem(12)}rem;
	padding: ${pxToRem(theme.spacing(2))}rem;
`

const WebexCallbackDisclaimer = styled.div`
	width: 100%;
`

const ConnectionStatus = styled.div`
	color: ${theme.palette.common.white};
	text-align: center;
	width: 100%;
`

const PatientVideo = styled.video`
	width: 100%;
	height: 100%;
`

const SelfViewVideo = styled.video`
	width: ${pxToRem(videoH)}rem;
	height: auto;
`

const SelfViewWrapper = styled.div`
	position: relative;
	margin-left: ${pxToRem(theme.spacing(2))}rem;
`

const CallButtonsWidget = styled.div`
	color: white;
	display: flex;
	width: 100%;
	justify-content: space-around;
	padding: 0 5%;

	.inactive {
		background-color: ${theme.palette.error.main};
		color: ${theme.palette.error.contrastText};
	}

	.active {
		background-color: ${theme.palette.success.main};
		color: ${theme.palette.success.contrastText};
	}
`

const MediaButton = styled(IconButton)`
	width: ${pxToRem(theme.spacing(4))}rem;
	height: ${pxToRem(theme.spacing(4))}rem;
	padding: 0 ${pxToRem(theme.spacing(1))}rem;
`

const ResizeHandle = styled(ExpandIcon)`
	width: 2rem;
	height: 2rem;
	padding: 0.5rem;
	position: absolute;
	left: 0;
	bottom: 0;
	background-color: ${theme.palette.common.white};
`

const OpenWebexDesktopAppButton = styled.button`
	text-decoration: underline;
	margin-left: ${pxToRem(theme.spacing(0.5))}rem;
	cursor: pointer;
	color: inherit;
`

interface Props { }

const CallWidget: React.FC<Props> = () => {
	const connectionStatus = useSelector(selectConnectionStatus)
	const prevConnectionStatus = useSelector(selectPrevConnectionStatus)
	const selfView = useRef<HTMLVideoElement>(null)
	const remoteViewVideo = useRef<HTMLVideoElement>(null)
	const remoteViewAudio = useRef<HTMLAudioElement>(null)
	const destinationWebexId = useSelector(selectDestinationWebexId)
	const videoOn = useSelector(selectVideoOn)
	const audioOn = useSelector(selectAudioOn)
	const shareOn = useSelector(selectShareOn)
	const grant = useSelector(selectMediaGrants)
	const showGrantWarning = useSelector(selectShowGrantWarning)
	const [showSwitchDialog, setShowSwitchDialog] = useState(false)
	const showGrantWarningDialog = showGrantWarning === true && grant === 'denied'
	const webexDesktopLink = `webexteams://meet?sip=${destinationWebexId}`

	const dispatch: TDispatch = useDispatch()

	useEffect(() => {
		destinationWebexId &&
			grant === 'unknown' &&
			dispatch(permissionsActions.accessMedia())


		destinationWebexId &&
			grant === 'granted' &&
			dispatch(
				actions.reJoinCurrentMeeting({
					destination: destinationWebexId,
					selfView: selfView,
					remoteViewVideo: remoteViewVideo,
					remoteViewAudio: remoteViewAudio,
				}),
			)

		grant === 'unknown' && dispatch(actions.setShowGrantWarning(true))

		return (): void => {
			dispatch(slice.actions._setShareOn(false))
		}
	}, [dispatch, destinationWebexId, grant])

	if (
		connectionStatus === 'INACTIVE' ||
		(showGrantWarning === false && grant === 'denied')
	) {
		return <div>Instert the token and the destination id</div>
	}

	return (
		<>
			<Dialog open={showSwitchDialog}>
				<DialogContent>
					<DialogContentText>
						If you are experiencing problem with videocall, try to call your patient with another app
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => setShowSwitchDialog(false)}
						variant="text"
					>
						Cancel
					</Button>
					<Button
						onClick={() => {
							setShowSwitchDialog(false)
							window.location.href = webexDesktopLink
						}}
						autoFocus
						variant="text"
					>
						Confirm
					</Button>
				</DialogActions>
			</Dialog>
			{showGrantWarningDialog ? (
				<Dialog open={showGrantWarning}>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							Access to camera and microphone medias has been denied. To enjoy video call, please allow them and reload the page.
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button
							onClick={() => dispatch(actions.setShowGrantWarning(false))}
							variant="text"
						>
							Cancel
						</Button>
					</DialogActions>
				</Dialog>
			) : (
				<Draggable bounds="parent" handle=".dragHandle">
					<Card data-testid="call-widget">
						<CardHeader className="dragHandle">
							<DragIconStyled />
						</CardHeader>
						<CardContent>
							<WebexVideocallContainer>
								{connectionStatus !== 'ACTIVE' ? (
									<ConnectionStatus>
										Connection status:{' '}
										{connectionStatus && !prevConnectionStatus
											? 'CALLING'
											: connectionStatus}
									</ConnectionStatus>
								) : (
									<>
										<audio ref={remoteViewAudio} autoPlay />
										<ResizableBox
											handle={<ResizeHandle />}
											width={(videoH / 9) * 16}
											minConstraints={[(videoH / 9) * 16, videoH]}
											lockAspectRatio={true}
											height={videoH}
											resizeHandles={['sw']}
											data-testid="webex-resizable-box"
										>
											<PatientVideo
												ref={remoteViewVideo}
												autoPlay
												playsInline
											/>
										</ResizableBox>
										<SelfViewWrapper>
											<SelfViewVideo
												ref={selfView}
												muted={true}
												autoPlay
												playsInline
											/>
											<CallButtonsWidget>
												<MediaButton
													className={audioOn ? 'active' : 'inactive'}
													onClick={() => dispatch(actions.toggleAudio())}
												>
													<MicIcon />
												</MediaButton>
												<MediaButton
													className={videoOn ? 'active' : 'inactive'}
													onClick={() => dispatch(actions.toggleVideo())}
												>
													<VideoIcon />
												</MediaButton>
												{!isMobile() && (
													<MediaButton
														data-testid="screen-share-btn"
														className={shareOn ? 'active' : 'inactive'}
														onClick={() => dispatch(actions.toggleShare())}
													>
														{shareOn ? <CloseIcon /> : <ScreenShareIcon />}
													</MediaButton>
												)}
											</CallButtonsWidget>
										</SelfViewWrapper>
									</>
								)}
							</WebexVideocallContainer>
							<WebexCallback>
								<WebexCallbackDisclaimer>
									Do you have problem with videocall?
									<OpenWebexDesktopAppButton onClick={() => setShowSwitchDialog(true)}>
										Click here
									</OpenWebexDesktopAppButton>
								</WebexCallbackDisclaimer>
							</WebexCallback>
						</CardContent>
					</Card>
				</Draggable>
			)}
		</>
	)
}

export default CallWidget
