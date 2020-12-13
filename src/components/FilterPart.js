import React, {useCallback, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faTimes} from "@fortawesome/free-solid-svg-icons";
import DatePicker from 'react-datepicker2';
import {OverlayTrigger, Tooltip} from "react-bootstrap";

const FilterPart = (props) => {
	// let headers = props.headers;

	// const [filterField, setFilterField] = useState('');
	// const [filterValue, setFilterValue] = useState('');
	const [from, setFrom] = useState(undefined);
	const [to, setTo] = useState(undefined);

	// const setFieldValue = useCallback((e) => {
	// 	let target = e.target;
	// 	setFilterField(target.value);
	// }, []);

	// const changeValue = (e) => {
	// 	let target = e.target;
	// 	setFilterValue(target.value);
	// };

	const sendBackData = (e) => {
		e.preventDefault();
		let lastData = {};
		// if (filterField !== '' && filterValue !== '') {
		// 	lastData = {filtersBy: [{filterValue: [filterValue], field: filterField}]};
		// }
		if (from && to) {
			let filtersByDate = {
				filtersByDate: [{
					filterValue: {
						from: from,
						to: to,
					},
					field: 'orderDate',
				}]
			};
			lastData = {...lastData, ...filtersByDate};
			props.setData(lastData);
		}
	};

	const setSelectedDay = useCallback((name, e) => {
		if (name === 'from') {
			setFrom(e);
		} else {
			setTo(e);
		}
	}, []);

	const clearDates = useCallback(() => {
		setFrom(undefined);
		setTo(undefined);
		props.setData(null);
	}, []);

	return (
		<form noValidate={true} autoComplete="off" onSubmit={(e) => sendBackData(e)}>
			<div className="form-group d-flex w-100 flex-column align-items-center flex-md-row justify-content-center mt-3 mt-md-0 pr-0 pr-md-3">
				{/*<select className="w-100 filterDropDown ml-0 ml-md-2 mt-1 mt-md-0" defaultValue="" onChange={setFieldValue} style={{maxWidth: 220}}>*/}
				{/*	<option value="">نوع فیلد...</option>*/}
				{/*	{headers && headers.map((item) => {*/}
				{/*		return (*/}
				{/*			<option key={item.name.toString()} value={item.name}>{item.persianName}</option>*/}
				{/*		)*/}
				{/*	})}*/}
				{/*</select>*/}
				{/*<input type="text" name="floor" value={filterValue} className='form-control mt-1 mt-md-0 ml-0 ml-md-1' placeholder="عنوان فیلتر..." onChange={changeValue} style={{paddingLeft: 30, maxWidth: 220}}/>*/}
				<OverlayTrigger key='clone' placement='top' overlay={
					<Tooltip id={`tooltip-top`} style={{fontFamily: 'Vazir'}}>
						حذف تاریخ ها
					</Tooltip>
				}>
					<button type="button" className="btn btn-outline-secondary d-flex align-items-center justify-content-center mx-1" style={{minHeight: 38}} onClick={clearDates}>
						<FontAwesomeIcon icon={faTimes} />
					</button>
				</OverlayTrigger>
				<div className="w-100">
					<DatePicker
						onChange={(value) => setSelectedDay('from', value)}
						value={from}
						showTodayButton={false}
						timePicker={false}
						isGregorian={false}
						placeholder="از تاریخ..."
						className="form-control mt-1 mt-md-0"
					/>
				</div>
				<div className="w-100">
					<DatePicker
						onChange={(value) => setSelectedDay('to', value)}
						value={to}
						showTodayButton={false}
						timePicker={false}
						isGregorian={false}
						placeholder="تا تاریخ..."
						className="form-control mr-0 mr-md-1 mt-1 mt-md-0"
					/>
				</div>
				<button type="submit" className="outline btn btn-primary d-flex align-items-center justify-content-center mr-md-2 mt-1 mt-md-0 w-100 w-md-auto customWidth">
					<FontAwesomeIcon icon={faArrowLeft} />
				</button>
			</div>
		</form>
	)
};

export default FilterPart;
