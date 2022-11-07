import React from 'react';
import { HeaderContainer, HeaderName } from './HeaderStyle';
type Props = { name?: string };

const Header = ({ name = '<your name here>' }: Props) => {
	return (
		<HeaderContainer>
			<HeaderName>{name}</HeaderName>
		</HeaderContainer>
	);
};

export default Header;
