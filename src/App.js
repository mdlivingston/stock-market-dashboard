import './App.css';
import Box from './Components/Box';
import SP500 from './Components/SP500';
import axios from 'axios';
import { useEffect, useState } from 'react';



async function fetchIndicators()
{

	const result = await axios(
		`https://us-central1-gaugemarkethealth.cloudfunctions.net/indicators`,
	);
	console.log(result.data)
	return result.data ? result.data : result.message;
}

export default function App()
{
	//const [mainIndicators, setMainIndicators] = useState([])

	// useEffect(() =>
	// {
	// 	async function assignIndicators()
	// 	{
	// 		setMainIndicators(await fetchIndicators());
	// 	}
	// 	assignIndicators();
	// }, []);


	return (
		<div className="container">
			<h3 className="header">MARKET HEALTH</h3>
			<div className="flex-r">
				{/* <Box
					title={'GrossDomesticProduct'}
					valueChange={mainIndicators.length > 0 ? mainIndicators[2][0] : ''}
					metaValue={mainIndicators.length > 0 ? mainIndicators[2][1] : ''} className="inner"></Box>
				<Box
					title={'New Residential Construction'}
					valueChange={mainIndicators.length > 0 ? mainIndicators[2][4] : ''}
					metaValue={mainIndicators.length > 0 ? mainIndicators[2][5] : ''} className="inner"></Box> */}
			</div>
			<div className="content">
				<SP500 className={'card'}></SP500>
			</div>
			<div className="flex-r">
				<div className="inner"></div>
				<div className="inner"></div>
			</div>
		</div>
	);
}

