const PageNumberGenerator = (totalCount, pageSize) => {
	return new Promise(result => {
		let value;
		if (totalCount % pageSize === 0) {
			value = totalCount / pageSize;
			generateNumbers(value)
				.then((response) => {
					result(response);
				})
		} else {
			value =  totalCount / pageSize + 1;
			generateNumbers(value)
				.then((response) => {
					result(response);
				})
		}
	})
};

const generateNumbers = (value) => {
	return new Promise((result) => {
		let numbers = [];
		for (let i = 1; i <= value; i++) {
			numbers = [...numbers, i];
		}
		result(numbers);
	})
};

export default PageNumberGenerator;
