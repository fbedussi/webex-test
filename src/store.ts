import { configureStore } from '@reduxjs/toolkit'

import app from './features/app/slice'
import webex from './features/webex/slice'
import { RootState } from './model/model'

const reducer = {
	webex,
	app,
}

export const getTestStore = (preloadedState: Partial<RootState>) =>
	configureStore({
		reducer,
		preloadedState,
	})

export default configureStore({
	reducer,
})
