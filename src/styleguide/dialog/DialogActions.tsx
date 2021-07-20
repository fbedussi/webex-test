import styled from 'styled-components'

import { DialogActions as MDialogActions } from '@material-ui/core'

import theme from '../theme'

const DialogActions = styled(MDialogActions)`
	justify-content: space-around;
	text-transform: uppercase;

	.MuiButton-text * {
		color: ${theme.palette.secondary.main};
		text-transform: uppercase;
		font-weight: bold;
	}

	.MuiButton-text.Mui-disabled * {
		opacity: 0.5;
		color: ${theme.palette.grey[500]};
	}
`

export default DialogActions
