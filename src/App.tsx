import React, { useState, useEffect } from 'react';
import Header from './Component/Header';
import Card from './Component/Card';
import Layout from './Component/Layout';
import { IncomingDataType, snakeBidType } from './type';
import { IMessageEvent, w3cwebsocket } from 'websocket';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './Component/ErrorBoundary';

function App() {
	const name = 'Jeff';

	const [error, setError] = useState<boolean>(false);
	const [incomingData, setIncomingData] = useState<IncomingDataType>();
	const [websocketData, setWebsocketData] = useState<snakeBidType[]>([]);

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
	}, []);

	useEffect(() => {
		const appendData = (): void => {
			if (websocketData.length === 0) {
				if (incomingData) {
					const { id, stage, bid }: IncomingDataType = incomingData;
					return setWebsocketData([
						{ id: id, stage: stage, highest: bid, TVL: bid, bidArray: [bid!] },
					]);
				}
			} else {
				const insertDataIndex: number = websocketData.findIndex(
					(w) => w.id === incomingData?.id
				);
				if (insertDataIndex === -1) {
					const { id, stage, bid }: IncomingDataType = incomingData!;
					return setWebsocketData((prevData) => [
						...prevData,
						{ id: id, stage: stage, highest: bid, TVL: bid, bidArray: [bid!] },
					]);
				} else {
					const existingSnake: snakeBidType = websocketData[insertDataIndex];
					const { id, highest, TVL, bidArray }: snakeBidType = existingSnake!;
					const { bid, stage }: IncomingDataType = incomingData!;
					let newHighest: number;

					switch (incomingData?.stage) {
						case 1:
							if (highest! > incomingData?.bid!) {
								newHighest = highest;
							} else {
								newHighest = incomingData.bid;
							}
							websocketData[insertDataIndex] = {
								id: id,
								stage: stage,
								highest: newHighest,
								TVL: TVL + bid,
								bidArray: [...bidArray, bid],
							};
							return setWebsocketData(websocketData);

						case 2:
							if (highest! > incomingData?.bid!) {
								newHighest = highest;
							} else {
								newHighest = incomingData.bid;
							}
							websocketData[insertDataIndex] = {
								id: id,
								stage: stage,
								highest: newHighest,
								TVL: TVL - bid,
								bidArray: [...bidArray, bid],
							};
							return setWebsocketData(websocketData);

						case 3:
							if (highest! > incomingData?.bid!) {
								newHighest = highest;
							} else {
								newHighest = incomingData.bid;
							}
							websocketData[insertDataIndex] = {
								id: id,
								stage: stage,
								highest: newHighest,
								TVL: 0,
								bidArray: [...bidArray],
							};
							return setWebsocketData(websocketData);
					}
				}
			}
		};
		appendData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [incomingData]);

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
