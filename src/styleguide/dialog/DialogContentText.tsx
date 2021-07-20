import styled from 'styled-components'

import { DialogContentText as MDialogContentText } from '@material-ui/core'

import theme from '../theme'

const DialogContentText = styled(MDialogContentText)`
	color: ${theme.palette.primary.main};
	&::first-letter {
		text-transform: uppercase;
	}
`

export default DialogContentText
