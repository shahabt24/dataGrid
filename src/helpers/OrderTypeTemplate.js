import React from "react";

const OrderTypeTemplate = (status, statusText) => {
	switch (status) {
		case 1:
			return <span className="px-2 rounded text-white" style={{backgroundColor: '#e213f6'}}>{statusText}</span>;
		case 2:
			return <span className="px-2 rounded text-white" style={{backgroundColor: '#893cf6'}}>{statusText}</span>;
		case 3:
			return <span className="px-2 rounded text-white" style={{backgroundColor: '#4036f6'}}>{statusText}</span>;
		case 4:
			return <span className="px-2 rounded text-white" style={{backgroundColor: '#32adf6'}}>{statusText}</span>;
		case 5:
			return <span className="px-2 rounded text-white" style={{backgroundColor: '#27f63b'}}>{statusText}</span>;
		case 6:
			return <span className="px-2 rounded text-white" style={{backgroundColor: '#baab1f'}}>{statusText}</span>;
		case 7:
			return <span className="px-2 rounded text-white" style={{backgroundColor: '#f62522'}}>{statusText}</span>;
		default:
			return <span className="px-2 rounded text-white" style={{backgroundColor: '#f1f1f1'}}>---</span>;
	}
};

export default OrderTypeTemplate;
