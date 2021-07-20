export type Seconds = number

export type LoginStatus = 'not logged in' | 'logging in' | 'logged in'

export type WebexConnectionStatus = 'INACTIVE' | 'ACTIVE' // maybe more values, they came from webex

export interface WebexLoginData {
  accessToken: string
}

export interface WebexState {
  loginData: WebexLoginData
  loginStatus: LoginStatus
  connectionStatus: WebexConnectionStatus
  prevConnectionStatus?: WebexConnectionStatus
  callStatusLocal: string
  callStatusRemote: string
  shareOn: boolean
  showGrantWarning: boolean
  destinationWebexId: string
}

export type MediaGrants = 'granted' | 'denied' | 'checking' | 'unknown'

export interface AppState {
  mediaGranted: MediaGrants
}

export interface RootState {
  app: AppState
  webex: WebexState
}
