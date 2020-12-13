import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

const SearchBox = (props) => {
	let searchValue = props.searchValue;
	return (
		<form noValidate={true} autoComplete="off" onSubmit={(e) => props.searchData(e)}>
			<div className="form-group d-flex justify-content-start">
				<div className="w-100 position-relative d-flex">
					<input type="text" name="floor" value={searchValue} className='form-control' placeholder="جستجو..." onChange={props.changeValue} style={{paddingLeft: 30}}/>
				</div>
				<button type="submit" className="outline btn btn-primary d-flex align-items-center justify-content-center mr-2">
					<FontAwesomeIcon icon={faArrowLeft} />
				</button>
			</div>
		</form>
	)
};

export default SearchBox;
