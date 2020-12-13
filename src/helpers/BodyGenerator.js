const BodyGenerator = (filterValues, sort, search, dateFilter) => {
	let filter = {
		filtersBy: filterValues,
	};
	// let body = {};
	// if (sort?.field !== '') {
	// 	body = {search, ...sort};
	// }
	// if (filter?.filtersBy?.field !== '') {
	// 	let filtersBy = filter?.filtersBy;
	// 	body = {...body, filtersBy};
	// }
	// if (filter?.filtersByDate?.filterValue.from !== '') {
	// 	let filtersByDate = filter?.filtersByDate;
	// 	body = {...body, filtersByDate};
	// }

	let body = {search, sort, ...filter, ...dateFilter};
	return JSON.stringify(body);
};

export default BodyGenerator;
