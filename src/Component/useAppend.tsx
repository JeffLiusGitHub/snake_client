import React, { useState, useCallback } from 'react';
import { snakeBidType, IncomingDataType } from '../type';

const useAppend = () => {
	const [websocketData, setWebsocketData] = useState<snakeBidType[]>([]);

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

	return { websocketData, appendData };
};

export default useAppend;
