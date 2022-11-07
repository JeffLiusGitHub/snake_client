import React, { useEffect, useState, memo, useMemo, useCallback } from 'react';
import { CardContainer, PictureContainer, DataContainer } from './CardStyle';
import { snakeBidType } from '../type';
import CustomModal from './Modal';

const Card = ({ id, stage, highest, TVL, bidArray }: snakeBidType) => {
	const [selected, setSelected] = useState<boolean>(false);
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [cardIsVisible, setCardIsVisible] = useState<boolean>(true);
	const cardBidArray = useMemo(() => {
		return bidArray;
	}, [bidArray]);
	const handleModalClose = useCallback(() => {
		setModalOpen(false);
	}, []);

	const handleCardInvisible = useCallback(() => {
		setCardIsVisible(false);
	}, []);

	useEffect(() => {
		const modalBidDisplay = () => {
			if (stage === 3) {
				setModalOpen(true);
				const closeModalandCard = () => {
					setModalOpen(false);
					setCardIsVisible(false);
				};
				let timeout = setTimeout(() => closeModalandCard(), 9000);
				return () => {
					clearTimeout(timeout);
				};
			}
		};
		modalBidDisplay();
	}, [stage]);

	const onClickHander = () => {
		setSelected((prevSelect) => !prevSelect);
	};

	const cardElement = (
		<CardContainer onClick={onClickHander} selected={selected}>
			<PictureContainer>
				<p>Picture of snake here</p>
				{/* <p>stage:{stage}</p>
				<p style={{ overflowWrap: 'break-word' }}>{bidArray.toString()}</p> */}
			</PictureContainer>
			<DataContainer>
				<p>Snake ID: {id}</p>
				<p>Snake TVL: {TVL}</p>
				<p>Highest bid: {highest}</p>
			</DataContainer>
			<CustomModal
				modalOpen={modalOpen}
				handleModalClose={handleModalClose}
				id={id}
				bids={cardBidArray}
				setCardIsVisible={handleCardInvisible}
			/>
		</CardContainer>
	);

	return <>{cardIsVisible && cardElement}</>;
};

export default memo(Card);
