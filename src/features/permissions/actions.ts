import { AppThunk } from '../../model/types'
import appActions from '../app/actions'

export const accessMedia = (): AppThunk => dispatch => {
	dispatch(appActions.setMediaGrants('checking'))

	navigator.mediaDevices
		.getUserMedia({
			video: true,
			audio: true,
		})
		.then(() => {
			dispatch(appActions.setMediaGrants('granted'))
		})
		.catch(() => {
			dispatch(appActions.setMediaGrants('denied'))
		})
}

const browserPermissionsActions = {
	accessMedia,
}

export default browserPermissionsActions
