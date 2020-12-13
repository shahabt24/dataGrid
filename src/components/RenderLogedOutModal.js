import React from 'react';
import {Modal} from "react-bootstrap";

const RenderLoggedOutModal = (props) => {

	return (
		<Modal
			show={true}
			size="md"
			centered={true}>
			<div className="modal-content p-4">
				<div className="modal-body d-flex flex-column align-items-center justify-content-center text-center">
					<span>کاربر گرامی، شما از سیستم خارج شدید.</span>
					<span>لطفا مجددا وارد شوید.</span>
				</div>
				<div className="d-flex align-items-center justify-content-center w-100 mt-3">
					<button type="button" className="btn btn-outline-secondary" onClick={() => props.setOpen('loggedOut')}>
						تایید
					</button>
				</div>
			</div>
		</Modal>
	)
};

export default RenderLoggedOutModal;
