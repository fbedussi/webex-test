export { }

declare global {
	interface Window {
		Webex: any,
		callAgent: CallAgent | undefined
	}
}
