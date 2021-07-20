import { RootState } from '../../model/model'

export const selectMediaGrants = (state: RootState) => state.app.mediaGranted
