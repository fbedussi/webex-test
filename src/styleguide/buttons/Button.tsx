import React from 'react'
import styled from 'styled-components'

import { Button as MButton, ButtonProps } from '@material-ui/core'

import { pxToRem } from '../../libs/style'
import theme from '../theme'
import FirstLetterCapital from '../typography/FirstLetterCapital'

const MyButton = styled(MButton)`
	border-radius: 10em;
	text-transform: lowercase;
	padding: ${pxToRem(theme.spacing(1))}rem ${pxToRem(theme.spacing(3))}rem;

	&.MuiButton-outlined {
		padding: ${pxToRem(theme.spacing(0.7))}rem ${pxToRem(theme.spacing(2))}rem;

		.MuiButton-label {
			font-weight: bold;
		}
	}
`

const TextButton = styled(MButton)`
	&:hover {
		background-color: transparent;
	}
`

const Label = styled(FirstLetterCapital)`
	border-bottom: ${(props: Props) =>
		props.underlined ? 'solid 1px currentcolor' : 'none'};
`

interface Props extends ButtonProps {
	underlined?: boolean
	loading?: boolean
	component?: string
}

const Button: React.FC<Props> = React.forwardRef((p, ref) => {
	const { children, loading, underlined, ...props } = p
	return props.variant === 'text' ? (
		<TextButton
			{...props}
			ref={ref}
			disableFocusRipple={true}
			disableRipple={true}
		>
			<Label className="textButton--label" underlined={underlined}>
				{children}
			</Label>
		</TextButton>
	) : (
		<MyButton
			color="primary"
			variant="contained"
			{...props}
			disableElevation
			ref={ref}
		>
			<Label className="button--label" underlined={underlined}>
				{children}
			</Label>
		</MyButton>
	)
})

export default Button
