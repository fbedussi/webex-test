import React from 'react'

import { SvgProps } from '../../model/types'

const ScreenShareIcon: React.FC<SvgProps> = ({ className }) => {
	return (
		<svg
			height="26"
			width="26"
			viewBox="0 0 4.617 4.123"
			fill="currentColor"
			className={className}
		>
			<path d="M2.286 0c-.112 0-.216.039-.27.099l-.28.303-.275.305c-.118.13.038.288.281.286l.334-.004v1.554h.465V.984l.345-.003c.244-.003.392-.165.265-.292L2.857.39 2.562.092A.395.395 0 002.286 0zM.392 1.447A.397.397 0 000 1.84v1.893c0 .213.179.39.392.39h3.833a.395.395 0 00.392-.39V1.84a.397.397 0 00-.392-.393H2.677v.432h1.51v1.814H.43V1.88h1.51v-.432z" />
			<path d="M2.88.789l-.572.006L1.736.8l.278-.304.278-.304.294.298z" />
		</svg>
	)
}

export default ScreenShareIcon
