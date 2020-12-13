import React, {useState, useCallback} from 'react';
import RenderLogedOutModal from "../components/RenderLogedOutModal";
import RenderFetchErrorModal from "../components/RenderFetchErrorModal";
import RenderTable from "../components/RenderTable";

const Home = (props) => {

	const [loggedOutModal, setLoggedOutModal] = useState(false);
	const [fetchError, setFetchErrorModal] = useState(false);

	const setOpen = useCallback((val) => {
		if (val === 'loggedOut') {
			setLoggedOutModal(false);
		} else {
			setFetchErrorModal(false);
		}
	}, []);

	const fetchErrorFn = useCallback(() => {
		setFetchErrorModal(true);
	}, []);

	const setLoggedOutFn = useCallback(() => {
		setLoggedOutModal(true);
	}, []);


	return (
		<div className="w-100 d-flex flex-column pt-3">
			<RenderTable setFetchError={fetchErrorFn} setLoggedOut={setLoggedOutFn} />
			{loggedOutModal && <RenderLogedOutModal setOpen={setOpen} />}
			{fetchError && <RenderFetchErrorModal setOpen={setOpen} />}
		</div>
	)
};

export default Home;
