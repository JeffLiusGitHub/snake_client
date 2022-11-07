import { useCallback, useState, useEffect } from 'react';
import { IncomingDataType, snakeBidType } from '../../type';

const useAppend = () => {
	const [incomingData, setIncomingData] = useState<IncomingDataType>();
	const [websocketData, setWebsocketData] = useState<snakeBidType[]>([]);

	const appendData = useCallback(
		(
			incomingData: IncomingDataType,
			websocketData: snakeBidType[],
			setWebsocketData: React.Dispatch<React.SetStateAction<snakeBidType[]>>
		): void => {
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

					switch (incomingData?.stage) {
						case 1:
							websocketData[insertDataIndex] = {
								id: id,
								stage: stage,
								highest: Math.max(highest, incomingData?.bid!),
								TVL: TVL + bid,
								bidArray: [...bidArray, bid],
							};
							return setWebsocketData(websocketData);

						case 2:
							websocketData[insertDataIndex] = {
								id: id,
								stage: stage,
								highest: Math.max(highest, incomingData?.bid!),
								TVL: TVL - bid,
								bidArray: [...bidArray, bid],
							};
							return setWebsocketData(websocketData);

						case 3:
							websocketData[insertDataIndex] = {
								id: id,
								stage: stage,
								highest: Math.max(highest, incomingData?.bid!),
								TVL: 0,
								bidArray: [...bidArray],
							};
							return setWebsocketData(websocketData);
					}
				}
			}
		},
		[]
	);
	useEffect(() => {
		appendData(incomingData!, websocketData, setWebsocketData);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [incomingData]);

	return { incomingData, websocketData, setIncomingData };
};
export default useAppend;
