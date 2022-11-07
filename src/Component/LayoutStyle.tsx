import styled from 'styled-components';
import { mobile, laptop } from './Helper/Responsive';
export const LayoutContainer = styled.div`
	margin-top: 10vh;
	display: flex;
	justify-content: start;
	overflow-x: auto;
	overflow-y: hidden;
	height: auto;
	padding: 50px;

	${mobile({
		flexDirection: 'column',
		justifyContent: 'center',
		alignItem: 'center',
	})}
	${laptop({
		flexWrap: 'wrap',
	})}
`;
