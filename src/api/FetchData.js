import axios from 'axios';
import BodyGenerator from "../helpers/BodyGenerator";

const FetchData = (filterData, searchValue, sort, currentPage, token, pageSize, dateFilter) => {
	let url = `http://95.216.249.98:888/api/v1.0/order/GetOrders/${currentPage}/${pageSize}`;
	let headers = {
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + token,
	};
	let body = BodyGenerator(filterData, sort, searchValue, dateFilter);
	return axios.post(url, body,{headers})
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			if (error.response.status === 401) {
				// the best way is use redux to show one modal as unauthorized users notice.
				return 401;
				// RequestMiddleware(store, setRequestMiddleware('logout'));
			} else if (error.response.status === 403) {
				// the best way is use redux to show one modal as access denied notice.
				return false;
				// RequestMiddleware(store, setRequestMiddleware('accessDenied'));
			} else {
				return false;
			}
		})
};

export default FetchData;
