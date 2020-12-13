import React from 'react';
import Header from "./sections/Header";

const Layout = (props) => {

	return (
		<div className="container-fluid p-0 m-0">
			<Header />
			<div className="mainContainer px-5">
				{props.children}
			</div>
		</div>
	);
};

export default Layout;
