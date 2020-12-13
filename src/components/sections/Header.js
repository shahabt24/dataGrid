import React from 'react';
import '../../assets/Header.css';

const Header = () => {

		return (
			<div>
				<nav className="navbar sticky-top navbar-expand-md navbar-light p-0 position-fixed w-100 bgPink text-white" style={{height: 63}}>
					<div className="d-flex align-items-center">
						<span className="font-weight-bold text-white px-5">پروژه جدول داده</span>
					</div>
				</nav>
			</div>
		)
};

export default Header;
