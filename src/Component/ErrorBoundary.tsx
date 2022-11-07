import styled from 'styled-components';
const ErrorContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: column;
	margin: 50px 0;
	padding: 20px;
`;

const Title = styled.p`
	font-size: 50px;
`;

type Props = {
	error: Error;
	resetErrorBoundary: React.MouseEventHandler<HTMLButtonElement>;
};

const ErrorFallback = ({ error, resetErrorBoundary }: Props) => {
	return (
		<ErrorContainer role="alert">
			<Title>Something went wrong:</Title>
			<p>{error.message}</p>
			<button onClick={resetErrorBoundary}>Try again</button>
		</ErrorContainer>
	);
};

export default ErrorFallback;
