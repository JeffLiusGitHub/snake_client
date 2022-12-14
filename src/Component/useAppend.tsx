import React, { useState, useCallback } from 'react';
import { snakeBidType, IncomingDataType } from '../type';

const useAppend = () => {
	const [websocketData, setWebsocketData] = useState<snakeBidType[]>([]);

	const appendData = useCallback((incomingData: IncomingDataType): void => {
		setWebsocketData((prevData: snakeBidType[]): snakeBidType[] => {
			const { id, stage, bid }: IncomingDataType = incomingData!;
			const insertDataIndex: number = prevData?.findIndex(
				(w: any) => w.id === incomingData?.id
			);
			if (insertDataIndex === -1) {
				return [
					...prevData,
					{
						id: id,
						stage: stage,
						highest: bid,
						TVL: bid,
						bidArray: [bid],
					},
				];
			} else {
				const existingSnake: snakeBidType = prevData[insertDataIndex];
				const { id, highest, TVL, bidArray }: snakeBidType = existingSnake!;
				const newPrevData = [...prevData];
				switch (incomingData?.stage) {
					case 1:
						newPrevData[insertDataIndex] = {
							id: id,
							stage: stage,
							highest: Math.max(highest, incomingData?.bid!),
							TVL: TVL + bid,
							bidArray: [...bidArray, bid],
						};
						return [...newPrevData];

					case 2:
						newPrevData[insertDataIndex] = {
							id: id,
							stage: stage,
							highest: Math.max(highest, incomingData?.bid!),
							TVL: TVL - bid,
							bidArray: [...bidArray, bid],
						};
						return [...newPrevData];

					case 3:
						newPrevData[insertDataIndex] = {
							id: id,
							stage: stage,
							highest: Math.max(highest, incomingData?.bid!),
							TVL: 0,
							bidArray: [...bidArray],
						};
						return [...newPrevData];
				}
			}

			return prevData;
		});
	}, []);

	return { websocketData, appendData };
};

export default useAppend;
