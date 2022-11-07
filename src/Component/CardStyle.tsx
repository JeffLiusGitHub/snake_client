import styled from 'styled-components';
import { mobile, laptop } from './Helper/Responsive';
type div = { selected: boolean };
export const CardContainer = styled.div<div>`
	height: calc(80vh - 20rem);
	width: 18vw;
	min-width: 240px;
	min-height: 360px;
	display: flex;
	flex-direction: column;
	background-color: #d0e2f3;
	border: 3px solid black;
	justify-content: center;
	align-items: center;
	align-content: space-around;
	margin: 6px;
	transform: scale(${(props) => (props.selected ? 1.15 : 1)});
	z-index: ${(props) => (props.selected ? 100 : 0)};
	margin-top: ${(props) => (props.selected ? 100 : 0)}px;
	${laptop({
		width: 'calc(40vw - 10px)',
	})}
	${mobile({
		width: '100%',
		margin: '0 0 30px 0',
		maxWidth: '400px',
	})}
`;

export const PictureContainer = styled.div`
	height: 40%;
	width: 80%;
	padding: 10px;
	border: 3px solid black;
`;

export const DataContainer = styled.div`
	height: 40%;
	width: 80%;
	display: flex;
	flex-direction: column;
`;
