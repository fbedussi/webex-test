import React from 'react'

import { SvgProps } from '../../model/types'

const ExpandIcon: React.FC<SvgProps> = props => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			height="18"
			width="18"
			fill="currentColor"
			viewBox="0 0 20 20"
			{...props}
		>
			<path
				d="M.41 19.843c.209.21.548.21.757 0l6.69-6.69v2.74c0 .296.24.536.536.536h.357c.296 0 .536-.24.536-.536V11.25a.536.536 0 00-.536-.536H4.107a.536.536 0 00-.536.536v.357c0 .296.24.536.536.536h2.74l-6.69 6.69a.536.536 0 000 .758l.252.252zM11.25 9.286a.536.536 0 01-.536-.536V4.107c0-.296.24-.536.536-.536h.357c.296 0 .536.24.536.536v2.74l6.69-6.69c.21-.21.548-.21.758 0l.252.252c.21.21.21.549 0 .758l-6.69 6.69h2.74c.296 0 .536.24.536.536v.357c0 .296-.24.536-.536.536H11.25z"
				fillRule="nonzero"
			/>
		</svg>
	)
}

export default ExpandIcon
