import React from 'react';
import { LayoutContainer } from './LayoutStyle';

type Props = {
	children?: React.ReactElement[] | JSX.Element | JSX.Element[] | null;
};

const Layout = ({ children }: Props) => {
	return <LayoutContainer>{children}</LayoutContainer>;
};

export default Layout;
