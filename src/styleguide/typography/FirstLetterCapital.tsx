import styled from 'styled-components'

const FirstLetterCapital = styled.span`
	text-transform: lowercase;
	display: inline-block;
	&::first-letter {
		text-transform: uppercase;
	}
`

export default FirstLetterCapital
