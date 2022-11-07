import React, { useState, useEffect } from 'react';
import Header from './Component/Header';
import Card from './Component/Card';
import Layout from './Component/Layout';
import { snakeBidType } from './type';
import { IMessageEvent, w3cwebsocket } from 'websocket';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './Component/ErrorBoundary';
import Append from './Component/Helper/useAppend';
function App() {
	const name = 'Jeff';

	const { websocketData, setIncomingData } = Append();
	const [error, setError] = useState<boolean>(false);

	const BASE_URL: string = 'ws://localhost:8080/api/updates';

	useEffect(() => {
		const client = new w3cwebsocket(BASE_URL);
		client.onopen = (): void => {
			console.log('Client connected!');
			setError(false);
		};

		client.onmessage = (message: IMessageEvent): void => {
			const dataFromServer = JSON.parse(message?.data.toString());
			setIncomingData(dataFromServer);
		};

		client.onerror = (): void => {
			setError(true);
		};

		return () => client.close();
	}, [BASE_URL, setIncomingData]);

	return (
		<ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
			<div style={{ overflow: 'hidden' }}>
				<Header name={name} />
				<Layout>
					{!error ? (
						<>
							{websocketData?.length > 0 &&
								websocketData.map((w: snakeBidType) => (
									<Card key={w.id} {...w} />
								))}
						</>
					) : (
						<p>There are some error occurs, please try again later.</p>
					)}
				</Layout>
			</div>
		</ErrorBoundary>
	);
}

export default App;
