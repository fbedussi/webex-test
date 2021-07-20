import React from 'react'

import { SvgProps } from '../../model/types'

const CloseIcon: React.FC<SvgProps> = props => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			height="11.252107"
			width="11.251106"
			viewBox="0 0 11.251 11.252"
			fill="currentColor"
			{...props}
		>
			<path
				clipRule="evenodd"
				d="M10.373.084l.796.796c.11.11.11.288 0 .398l-4.35 4.349 3.606 3.605.744.744c.11.11.11.287 0 .397l-.796.796a.281.281 0 01-.398 0l-4.35-4.35-4.348 4.35a.281.281 0 01-.398 0l-.796-.796a.281.281 0 010-.397l4.35-4.35-4.35-4.349a.281.281 0 010-.398L.879.083c.11-.11.288-.11.398 0l4.35 4.35L9.23.826l.743-.744c.11-.11.288-.11.398 0z"
			/>
		</svg>
	)
}

export default CloseIcon
