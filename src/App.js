import './App.css';
import Box from './Components/Box';
import SP500 from './Components/SP500';
import axios from 'axios';
import { useEffect } from 'react';



async function fetchIndicators()
{

	const result = await axios(
		`https://us-central1-gaugemarkethealth.cloudfunctions.net/indicators`,
	);
	console.log(result.data.values)
	return result.data.values ? result.data.values : result.data;
}

export default function App()
{
	useEffect(() =>
	{
		//fetchIndicators();
	}, []);


	return (
		<div className="container">
			<h3 className="header">ECONOMY HEALTH</h3>
			<div className="flex-r">
				{/* <Box className="inner"></Box>
				<Box className="inner"></Box> */}
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

