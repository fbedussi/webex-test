import React from 'react'

import { SvgProps } from '../../model/types'

const AddIcon: React.FC<SvgProps> = props => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="#1f2327"
			width="18px"
			height="18px"
		>
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
		</svg>
	)
}

export default AddIcon
