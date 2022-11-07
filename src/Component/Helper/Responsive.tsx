import { css } from 'styled-components';

export const mobile = (props: any) => {
	return css`
		@media only screen and (max-width: 616px) {
			${props}
		}
	`;
};

export const laptop = (props: any) => {
	return css`
		@media only screen and (max-width: 900px) {
			${props}
		}
	`;
};
