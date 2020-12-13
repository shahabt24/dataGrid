import React from "react";

const enableTemplate = (props) => {
	if (props) {
		return (<div className="d-flex align-items-center justify-content-start">
			<span className="enableBoxSuccess">فعال</span>
		</div>)
	} else {
		return (<div className="d-flex align-items-center justify-content-start">
			<span className="enableBoxDanger">غیرفعال</span>
		</div>)
	}
};

const NameTemplate = (props) => {
	if (props) {
		return (<div style={props.padding ? {paddingTop: 10, paddingBottom: 10} : {}}>{props?.data ? props?.data : props}</div>);
	} else {
		if (props === 0) {
			return (<span>{props}</span>);
		} else {
			return (<span>-</span>);
		}
	}
};

export {enableTemplate, NameTemplate};
