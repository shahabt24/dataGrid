import React from 'react';

const FilterPart1 = (props) => {

	switch (props.item.name) {
		case 'customerId':
			return <input type="text" name={props.item.name} value={props.data.customerId} className="border-top-0 border-right-0 border-left-0 rounded-0 customInput" onChange={props.changeFilterInput}/>;
		case 'name':
			return <input type="text" name={props.item.name} value={props.data.name} className="border-top-0 border-right-0 border-left-0 rounded-0 customInput" onChange={props.changeFilterInput}/>;
		case 'basketTotalPrice':
			return <input type="text" name={props.item.name} value={props.data.basketTotalPrice} className="border-top-0 border-right-0 border-left-0 rounded-0 customInput" onChange={props.changeFilterInput}/>;
		case 'orderDate':
			return <input type="text" disabled={true} readOnly={true} name={props.item.name} value={props.data.orderDate} className="border-top-0 border-right-0 border-left-0 rounded-0 customInput" onChange={props.changeFilterInput}/>;
		case 'trackingCode':
			return <input type="text" name={props.item.name} value={props.data.trackingCode} className="border-top-0 border-right-0 border-left-0 rounded-0 customInput" onChange={props.changeFilterInput}/>;
		case 'status':
			return <input type="text" name={props.item.name} value={props.data.status} className="border-top-0 border-right-0 border-left-0 rounded-0 customInput" onChange={props.changeFilterInput}/>;
		default:
			return null;
	}
};

export default FilterPart1;
