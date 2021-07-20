import { createMuiTheme } from '@material-ui/core/styles'

const gray50 = '#f6f7f8'

// To add custom variables to theme with TS
// https://material-ui.com/guides/typescript/#customization-of-theme
const customTheme = {
	typography: {
		fontFamily: 'Avenir, Arial, sans-serif',
	},
	shape: {
		borderRadius: 5,
		borderThickness: 1,
	},
	palette: {
		primary: {
			main: '#1F2327',
		},
		secondary: {
			main: '#4072EE',
			light: '#EBF0FD',
			contrastText: '#fff',
		},
		success: {
			light: '#1E850933',
			main: '#1e8509',
		},
		error: {
			light: '#f8bbc2',
			main: '#E61B34',
			contrastText: '#fff',
		},
		background: {
			default: '#fff',
			secondary: gray50,
		},
		grey: {
			50: gray50,
			100: '#f1f2f4',
			200: '#e8ebed',
			300: '#ccd1d6',
			400: '#a2abb5',
			500: '#7b8a9a',
			600: '#535b64',
			700: '#464e54',
			800: '#2d3238',
			900: '#292e33',
			A100: '#1f2327',
			A200: '#171a1c',
			A300: '#111214',
			A400: '#f3f3f3',
		},
	},
	zIndex: {
		mobileStepper: 1000,
		speedDial: 1050,
		pageElements: 1070,
		header: 1101,
		appBar: 1100,
		drawer: 1200,
		autocompletePopper: 1250,
		modal: 1300,
		snackbar: 1400,
		tooltip: 1500,
		lightbox: 1600,
		call: 1700
	},
}

const theme = createMuiTheme(customTheme)

theme.typography.h1 = {
	fontSize: '1.6rem',
	fontWeight: 400,
	textTransform: 'capitalize',
}

theme.typography.h2 = {
	fontSize: '1.3rem',
	fontWeight: 400,
	textTransform: 'capitalize',
}

export const sizings = {
	mdLarge: 850,
	mdSmall: 740,
}

export default theme
