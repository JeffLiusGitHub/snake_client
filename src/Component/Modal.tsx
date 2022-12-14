import React, { useEffect, useState, useCallback, memo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};
type Props = {
	modalOpen: boolean;
	handleModalClose(): void;
	id?: string;
	bids?: number[];
	setCardIsVisible(): void;
};

const CustomModal = ({
	modalOpen,
	handleModalClose,
	id,
	bids,
	setCardIsVisible,
}: Props) => {
	const [sortedBidArray, setSortedBidArray] = useState<number[]>([]);
	useEffect(() => {
		const sortedArray = bids!.sort(function (a: number, b: number) {
			return b - a;
		});
		setSortedBidArray(sortedArray);
	}, [bids]);
	const highest = sortedBidArray[0];
	const successContent = (
		<>
			<Typography id="modal-modal-title" variant="h6" component="h2">
				Bidding finished!!!
			</Typography>
			<Typography id="modal-modal-description" sx={{ mt: 2 }}>
				Snake highest bid was: {highest}
			</Typography>
			<Typography
				id="modal-modal-description"
				sx={{ mt: 2 }}
				style={{ overflowWrap: 'break-word' }}
			>
				The second to last highest bid was:
				{sortedBidArray?.slice(1).toString()}
			</Typography>
			<Typography id="modal-modal-description" sx={{ mt: 2 }}>
				Congratulations to the lucky winner of {id}
			</Typography>
		</>
	);

	const unsuccessContent = (
		<>
			<Typography id="modal-modal-title" variant="h6" component="h2">
				Bidding finished!!!
			</Typography>
			<Typography id="modal-modal-description" sx={{ mt: 2 }}>
				Seems no one win card of {id}
			</Typography>
			<Typography id="modal-modal-description" sx={{ mt: 2 }}>
				Product action pass in.
			</Typography>
		</>
	);
	const closeModalandCard = useCallback(() => {
		setCardIsVisible();
		handleModalClose();
	}, [setCardIsVisible, handleModalClose]);

	return (
		<div>
			<Modal
				open={modalOpen}
				onClose={closeModalandCard}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					{highest === undefined || highest === 0
						? unsuccessContent
						: successContent}
				</Box>
			</Modal>
		</div>
	);
};

export default memo(CustomModal);
