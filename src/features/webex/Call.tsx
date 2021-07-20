import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import { IconButton } from '@material-ui/core'

import { pxToRem } from '../../libs/style'
import { TDispatch } from '../../model/types'
import MicIcon from '../../styleguide/icons/MicIcon'
import VideoIcon from '../../styleguide/icons/VideoIcon'
import theme from '../../styleguide/theme'
import actions from './actions'

const Container = styled.div`
	position: relative;
	height: calc(100% - ${pxToRem(theme.spacing(3))}rem);
	background-color: ${theme.palette.common.black};
`
const SelfView = styled.video`
	width: 18vh;
	height: 18vh;
	position: absolute;
	background-color: ${theme.palette.common.white};
	bottom: ${pxToRem(theme.spacing(3))}rem;
	right: ${pxToRem(theme.spacing(3))}rem;
`

const RemoteView = styled.video`
	width: 100%;
	height: 100%;
`

export const CallButtons = styled.div`
	position: absolute;
	bottom: ${pxToRem(theme.spacing(4))}rem;
	left: 50%;
	transform: translateX(-50%);
	color: white;

	.muted {
		background-color: ${theme.palette.error.main};
		color: ${theme.palette.error.contrastText};
	}

	.unmuted {
		background-color: ${theme.palette.success.main};
		color: ${theme.palette.success.contrastText};
	}
	> *:first-child {
		margin-right: ${pxToRem(theme.spacing(3))}rem;
	}
`

const MediaButton = styled(IconButton)`
	width: ${pxToRem(theme.spacing(6))}rem;
	height: ${pxToRem(theme.spacing(6))}rem;
`

const Call: React.FC<{ destination: string }> = ({ destination }) => {
	const selfView = useRef<HTMLVideoElement>(null)
	const remoteViewVideo = useRef<HTMLVideoElement>(null)
	const remoteViewAudio = useRef<HTMLAudioElement>(null)
	const [audioOn, setAudioOn] = useState(true)
	const [videoOn, setVideoOn] = useState(true)
	const dispatch: TDispatch = useDispatch()
	useEffect(() => {
		dispatch(
			actions.connect({
				destination,
				selfView: selfView,
				remoteViewVideo: remoteViewVideo,
				remoteViewAudio: remoteViewAudio,
			}),
		)
	}, [dispatch, destination])
	return (
		<Container>
			<audio ref={remoteViewAudio} autoPlay />
			<RemoteView ref={remoteViewVideo} autoPlay playsInline />

			<SelfView ref={selfView} muted={true} autoPlay playsInline />

			<CallButtons>
				<MediaButton
					className={audioOn ? 'unmuted' : 'muted'}
					onClick={() =>
						dispatch(actions.toggleAudio()).then(() => setAudioOn(!audioOn))
					}
				>
					<MicIcon />
				</MediaButton>
				<MediaButton
					className={videoOn ? 'unmuted' : 'muted'}
					onClick={() =>
						dispatch(actions.toggleVideo()).then(() => setVideoOn(!videoOn))
					}
				>
					<VideoIcon />
				</MediaButton>
			</CallButtons>
		</Container>
	)
}

export default Call
