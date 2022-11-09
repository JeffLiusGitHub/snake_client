import React, { useState, useEffect, useCallback } from 'react';
import Header from './Component/Header';
import Card from './Component/Card';
import Layout from './Component/Layout';
import { snakeBidType, IncomingDataType } from './type';
import { IMessageEvent, w3cwebsocket } from 'websocket';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './Component/ErrorBoundary';

function App() {
	const name = 'Jeff';

	const [websocketData, setWebsocketData] = useState<snakeBidType[]>([]);

	const [error, setError] = useState<boolean>(false);

	const BASE_URL: string = 'ws://localhost:8080/api/updates';

	const appendData = useCallback((incomingData: IncomingDataType): void => {
		setWebsocketData((prevData: snakeBidType[]): snakeBidType[] => {
			if (prevData?.length === 0) {
				if (incomingData) {
					const { id, stage, bid }: IncomingDataType = incomingData;
					return [
						{
							id: id,
							stage: stage,
							highest: bid,
							TVL: bid,
							bidArray: [bid!],
						},
					];
				}
			} else {
				const insertDataIndex: number = prevData?.findIndex(
					(w: any) => w.id === incomingData?.id
				);
				if (insertDataIndex === -1) {
					const { id, stage, bid }: IncomingDataType = incomingData!;
					return [
						...prevData,
						{
							id: id,
							stage: stage,
							highest: bid,
							TVL: bid,
							bidArray: [bid!],
						},
					];
				} else {
					const existingSnake: snakeBidType = prevData[insertDataIndex];
					const { id, highest, TVL, bidArray }: snakeBidType = existingSnake!;
					const { bid, stage }: IncomingDataType = incomingData!;

					switch (incomingData?.stage) {
						case 1:
							prevData[insertDataIndex] = {
								id: id,
								stage: stage,
								highest: Math.max(highest, incomingData?.bid!),
								TVL: TVL + bid,
								bidArray: [...bidArray, bid],
							};
							return [...prevData];

						case 2:
							prevData[insertDataIndex] = {
								id: id,
								stage: stage,
								highest: Math.max(highest, incomingData?.bid!),
								TVL: TVL - bid,
								bidArray: [...bidArray, bid],
							};
							return [...prevData];

						case 3:
							prevData[insertDataIndex] = {
								id: id,
								stage: stage,
								highest: Math.max(highest, incomingData?.bid!),
								TVL: 0,
								bidArray: [...bidArray],
							};
							return [...prevData];
					}
				}
			}
			return prevData;
		});
	}, []);
	useEffect(() => {
		const client = new w3cwebsocket(BASE_URL);
		client.onopen = (): void => {
			console.log('Client connected!');
			setError(false);
		};

		client.onmessage = (message: IMessageEvent): void => {
			const dataFromServer = JSON.parse(message?.data.toString());
			appendData(dataFromServer);
		};

		client.onerror = (): void => {
			setError(true);
		};

		return () => client.close();
	}, [BASE_URL, appendData]);

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
