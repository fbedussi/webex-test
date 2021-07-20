import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AppState, MediaGrants } from '../../model/model'

const initialState: AppState = {
	mediaGranted: 'unknown',
}

export const slice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setMediaGrants: (state, { payload }: PayloadAction<MediaGrants>) => {
			state.mediaGranted = payload
		},
	},
})

export default slice.reducer
