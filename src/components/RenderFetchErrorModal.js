import React from'react';
import {Modal} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationTriangle} from "@fortawesome/free-solid-svg-icons";

const RenderFetchErrorModal = (props) => {
	return (
		<Modal
			show={true}
			size="md"
			centered={true}
			onHide={() => {}}
		>
			<div className="modal-content">
				<div className="modal-body d-flex flex-column align-items-center justify-content-center">
					<FontAwesomeIcon icon={faExclamationTriangle} color="red" style={{fontSize: 50}}/>
					<span className="mt-3 text-danger">دریافت اطلاعات با مشکل مواجه شد.</span>
					<span className="mt-2 text-danger">لطفا مجددا تلاش کنید.</span>
					<div className={`w-100 d-flex align-items-center mt-5 justify-content-between`}>
						<button type="button" className="btn btn-outline-secondary" onClick={() => props.setOpen('fetchError')}>
							بازگشت
						</button>
						<button type="button" className="btn btn-primary" onClick={() => props.setOpen('fetchError')}>
							تلاش مجدد
						</button>
					</div>
				</div>
			</div>
		</Modal>
	)
};

export default RenderFetchErrorModal;
