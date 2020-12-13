import React, {useCallback, useEffect, useState} from 'react';
import '../assets/table.css';
import moment from 'moment-jalaali';
import OrderTypeTemplate from "../helpers/OrderTypeTemplate";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
	faArrowLeft,
	faChevronDown,
	faChevronUp, faFilter,
	faList
} from "@fortawesome/free-solid-svg-icons";
import {OverlayTrigger, Tooltip, Dropdown} from "react-bootstrap";
import DataSetter from "../helpers/DataSetter";
import FetchData from "../api/FetchData";
import Loader from "react-loader-spinner";
import PageNumberGenerator from "../helpers/PageNumberGenerator";
import RenderPageButtons from "./RenderPageButtons";
import SearchBox from "./SearchBox";
import FilterPart from "./FilterPart";
import FilterPart1 from "./FilterPart1";

const RenderTable = (props) => {

	const headers = [
		{
			name: 'customerId',
			persianName: 'شناسه مشتری',
		},
		{
			name: 'name',
			persianName: 'نام مشتری',
		},
		{
			name: 'basketTotalPrice',
			persianName: 'جمع سبد سفارش',
		},
		{
			name: 'orderDate',
			persianName: 'تاریخ سفارش',
		},
		{
			name: 'trackingCode',
			persianName: 'شماره پیگیری سفارش',
		},
		{
			name: 'status',
			persianName: 'وضعیت سفارش',
		},
	];
	const [data, setData] = useState({});
	const [bigLoader, setBigLoader] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [pagesNumber, setPagesNumber] = useState([]);
	const [pageSize, setPageSize] = useState('5');
	const [sort, setSort] = useState({sortValue: 0, field: ''});
	const [searchValue, setSearchValue] = useState('');

	const [customerId, setCustomerIde] = useState('');
	const [name, setName] = useState('');
	const [basketTotalPrice, setBasketTotalPrice] = useState('');
	const [orderDate] = useState('');
	const [trackingCode, setTrackingCode] = useState('');
	const [status, setStatus] = useState('');

	const [filterData, setFilterData] = useState(undefined);
	const [dateData, setDateData] = useState(undefined);

	useEffect(() => {
		getData(1);
	}, [sort, pageSize]);

	const getData = (destPage, filters, dateFilter) => {
		let lastFiltersData = filters ? filters : filterData;
		let lastDateData = dateFilter ? dateFilter : dateData;
		setBigLoader(true);
		//imagine that we logged in
		let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMDkzNTMyODMyNTJAc2VwZWhyY2MuY29tIiwiSWQiOiIwOGVmNzA3MC1kYmVkLTQwNWYtYThiZC0yMmU3YmJiNzRlYmQiLCJTaG9wSWQiOiI4OTMwIiwiVXNlck9sZEd1aWQiOiJiNWY4OTU5MS0xYTgyLTRhNWItYWMwYi1lM2M3YmNhMmIzYmYiLCJleHAiOjE2MDc4NTY3ODUsImlzcyI6Imh0dHA6Ly9zZXBlaHJjYy5jb20vIiwiYXVkIjoiaHR0cDovL3NlcGVocmNjLmNvbS8ifQ.vx-Hph9hOHMZi2vBSGxJWCIzgSaYiAqbOc1KgOaOfDI';
		FetchData(lastFiltersData, searchValue, sort, destPage, token, pageSize, lastDateData)
			.then((response) => {
				if (response) {
					if (response === 401) {
						props.setLoggedOut(true);
					} else {
						setData(response.data);
						PageNumberGenerator(response.data.totalCount, pageSize)
							.then((response) => {
								setPagesNumber(response);
							});
						setBigLoader(false);
					}
				} else {
					props.setFetchError(true);
				}
			})
			.catch((error) => {
				props.setFetchError(true);
			})
	};

	const changePageFn = (newPage) => {
		if (newPage === currentPage || newPage < 1 || newPage > pagesNumber[pagesNumber.length - 1]) {
			// do nothing
		} else {
			setCurrentPage(newPage);
			getData(newPage);
		}
	};

	const sortFn = (e) => {
		let target = e.target;
		if (sort.field !== target.name) {
			setSort({sortValue: 0, field: target.name});
		} else if (sort.field === target.name && sort.sortValue === 0) {
			setSort({sortValue: 1, field: target.name});
		} else {
			setSort({sortValue: 0, field: ''});
		}
	};

	const changeValue = useCallback((e) => {
		let target = e.target;
		setSearchValue(target.value);
	}, []);

	const searchData = (e) => {
		e.preventDefault();
		setCurrentPage(1);
		getData(1);
	};

	const setPageSizeValue = useCallback((e) => {
		let target = e.target;
		setCurrentPage(1);
		setPageSize(target.value);
	}, []);

	const changeFilterInput = (item, e) => {
		switch (item.name) {
			case 'customerId':
				setCustomerIde(e.target.value);
				break;
			case 'name':
				setName(e.target.value);
				break;
			case 'basketTotalPrice':
				setBasketTotalPrice(e.target.value);
				break;
			case 'trackingCode':
				setTrackingCode(e.target.value);
				break;
			case 'status':
				setStatus(e.target.value);
				break;
			default:
				break;
		}
	};

	const filterDataFn = async (e) => {
		e.preventDefault();
		let dataToCheck = {
			customerId,
			name,
			basketTotalPrice,
			trackingCode,
			status,
		};
		let filtersData = [];
		Object.keys(dataToCheck).forEach(key => {
			if (dataToCheck[key] !== '') {
				filtersData = [...filtersData, {
					filterValue: [dataToCheck[key].toString()],
					field: key,
				}]
			}
		});
		setFilterData(filtersData);
		setCurrentPage(1);
		getData(1, filtersData);
	};

	return (
		<div className="w-100 bg-white rounded boxShadow mt-3 mb-5 py-4 px-3">
			<div className="w-100 d-flex flex-column align-items-center justify-content-start flex-md-row justify-content-md-between">
				<SearchBox searchValue={searchValue} searchData={searchData} changeValue={changeValue} />
				<FilterPart headers={headers} setData={(data) => {
					console.log(data);
					setCurrentPage(1);
					setDateData(data);
					getData(1, null, data);
				}} />
			</div>
			<div className="table-responsive">
				<table className="w-100 text-center mt-5">
					<thead>
					<tr>
						<th style={{minWidth: 120}}>ردیف</th>
						{headers && headers.map((item, index) => {
							let data = {
								customerId,
								name,
								orderDate,
								basketTotalPrice,
								trackingCode,
								status
							};
							return (
								<th style={{minWidth: 160}} key={index.toString()}>
									<div className="d-flex flex-column align-items-center justify-content-center">
										<button name={item.name} type="button" className="outline btn btn-transparent" onClick={sortFn}>
											{item.persianName}
											{sort.field === item.name && sort.sortValue === 0 && <FontAwesomeIcon icon={faChevronUp} className="text-secondary mx-3" style={{fontSize: 10}}/>}
											{sort.field === item.name && sort.sortValue === 1 && <FontAwesomeIcon icon={faChevronDown} className="text-secondary mx-3" style={{fontSize: 10}}/>}
										</button>
										<form noValidate={true} autoComplete="off" className="form-group position-relative p-0 m-0" onSubmit={filterDataFn}>
											<FilterPart1 data={data} item={item} changeFilterInput={(value) => changeFilterInput(item, value)}/>
											<button type="submit" disabled={item.name === 'orderDate'} className="btn btn-transparent d-flex align-items-center justify-content-center position-absolute text-secondary" style={{width: 30, fontSize: 14, zIndex: 2, top: 0, left: 0}} onClick={filterDataFn}>
												<FontAwesomeIcon icon={faArrowLeft} />
											</button>
										</form>
									</div>
								</th>
							)
						})}
						<th style={{minWidth: 120}}>عملیات</th>
					</tr>
					</thead>
					<tbody className="w-100">
					{bigLoader && <tr style={{height: 300}}>
						<td colSpan={8}>
							<Loader type="ThreeDots" color='rgba(200, 0, 254, 1)' height={15} width={100} className="loader"/>
						</td>
					</tr>}
					{(data?.orders?.length > 0 && !bigLoader) && data?.orders?.map((item, index) => {
						return (
							<tr key={item?.id.toString()} className="customTr">
								<td>{(currentPage - 1) * pageSize + (index + 1)}</td>
								<td>{DataSetter(item?.customerId)}</td>
								<td>{DataSetter(item?.name)}</td>
								<td>{item?.basketTotalPrice ? item.basketTotalPrice.toLocaleString('fa-IR').replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' تومان' : '---'}</td>
								<td>{item?.orderDate ? moment(item.orderDate).format('jYYYY/jMM/jD') : '---'}</td>
								<td>{DataSetter(item?.trackingCode)}</td>
								<td>{OrderTypeTemplate(item?.status, item?.statusText)}</td>
								<td className="w-100 d-flex align-items-center justify-content-center">
									<OverlayTrigger key='clone' placement='top' overlay={
										<Tooltip id={`tooltip-top`} style={{fontFamily: 'Vazir'}}>
											جزئیات بیشتر
										</Tooltip>
									}>
										<button className="outline btn btn-transparent optionBtn rounded-circle d-flex align-items-center justify-content-center m-0 p-0" style={{width: 40, height: 40}} onClick={() => {}}>
											<FontAwesomeIcon icon={faList} className="text-secondary" style={{fontSize: 20}}/>
										</button>
									</OverlayTrigger>
								</td>
							</tr>
						)
					})}
					{(data?.orders?.length < 1 && !bigLoader) && <tr>
						<td colSpan={8}>
							<span className="text-danger">داده ای وجود ندارد.</span>
						</td>
					</tr>}
					</tbody>
				</table>
			</div>
			<hr className="w-100" />
			<div className="w-100 bg-white p-3 pb-0 d-flex flex-column align-items-center justify-content-start flex-md-row align-items-md-center justify-content-md-between">
				<RenderPageButtons disabledArrowButtons={data?.orders?.length < 1} pagesNumber={pagesNumber} currentPage={currentPage} changePage={(value) => changePageFn(value)} />
				<div className="d-block mt-3 my-md-0">
					<select className="filterDropDown" defaultValue="5" onChange={setPageSizeValue}>
						<option value="5">5</option>
						<option value="10">10</option>
						<option value="15">15</option>
					</select>
				</div>
				<span className="mt-3 mt-md-0">{`(\xa0${data.totalCount}\xa0آیتم\xa0)`}</span>
			</div>
		</div>
	)
};

export default RenderTable;
