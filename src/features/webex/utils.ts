export function bindUiElements({
	meeting,
	selfView,
	remoteViewVideo,
	remoteViewAudio,
}: {
	meeting: any
	selfView?: React.RefObject<HTMLVideoElement>
	remoteViewVideo: React.RefObject<HTMLVideoElement>
	remoteViewAudio: React.RefObject<HTMLAudioElement>
}) {
	// Handle media streams changes to ready state
	meeting.on('media:ready', (media: any) => {
		if (!media) {
			return
		}
		if (media.type === 'local' && selfView && selfView.current) {
			selfView.current.srcObject = media.stream
		}
		if (media.type === 'remoteVideo' && remoteViewVideo.current) {
			remoteViewVideo.current.srcObject = media.stream
		}
		if (media.type === 'remoteAudio' && remoteViewAudio.current) {
			remoteViewAudio.current.srcObject = media.stream
		}
	})

	// Handle media streams stopping
	meeting.on('media:stopped', (media: any) => {
		// Remove media streams
		if (media.type === 'local' && selfView && selfView.current) {
			selfView.current.srcObject = null
		}
		if (media.type === 'remoteVideo' && remoteViewVideo.current) {
			remoteViewVideo.current.srcObject = null
		}
		if (media.type === 'remoteAudio' && remoteViewAudio.current) {
			remoteViewAudio.current.srcObject = null
		}
	})
}

// Join the meeting and add media
export async function joinMeeting(meeting: any) {
	const mediaSettings = {
		receiveVideo: true,
		receiveAudio: true,
		receiveShare: false,
		sendVideo: true,
		sendAudio: true,
		sendShare: false,
	}
	try {
		const [localStream /* , localShare */] = await meeting.getMediaStreams(
			mediaSettings,
		)
		await meeting.join()

		await meeting.addMedia({
			// localShare,
			localStream,
			mediaSettings,
		})

		meeting.muteAudio()
		meeting.muteVideo()
	} catch (error) {
		console.error(error)
	}
}
