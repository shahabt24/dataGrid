import React from "react";

const DataSetter = (props) => {
	if (props) {
		return <span>{props}</span>
	} else {
		return <span>----</span>
	}
};

export default DataSetter;
