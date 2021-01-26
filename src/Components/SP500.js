import * as React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import Chart from "react-apexcharts";
import { Dropdown, Button } from 'react-bootstrap';

function getPreviousDate(subtractedDays)
{
    const date = new Date();
    date.setDate(date.getDate() - subtractedDays)
    return date;
}

async function fetchBBands(dayRange)
{
    const result = await axios(
        `https://api.twelvedata.com/bbands?symbol=SPX&interval=1day&apikey=${process.env.REACT_APP_STOCK_API_KEY}&outputsize=${dayRange}&order=ASC`,
    );
    console.log(result.data.values)
    return result.data.values ? result.data.values : result.data;
}

async function fetchStock(dayRange)
{
    const result = await axios(
        `https://api.twelvedata.com/time_series?symbol=SPX&interval=1day&apikey=${process.env.REACT_APP_STOCK_API_KEY}&outputsize=${dayRange}&order=ASC`,
    );
    console.log(result.data.values)
    return result.data.values ? result.data.values : result.data;
}

async function fetchSMA(interval, dayRange)
{
    const result = await axios(
        `https://api.twelvedata.com/sma?symbol=SPX&interval=1day&apikey=${process.env.REACT_APP_STOCK_API_KEY}&time_period=${interval}&outputsize=${dayRange}&order=ASC`,
    );
    console.log(result.data.values)
    return result.data.values;
}

export default function SP500()
{
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [smaSmall, setSmaSmall] = useState();
    const [smaLarge, setSmaLarge] = useState();
    const [dayRangeString, setDayRangeString] = useState('Half a year');
    const [error, setError] = useState('');

    useEffect(() =>
    {
        fetchData('6 Months', 180);
    }, []);

    return (
        <React.Fragment>


            {loading && <h3 style={{ color: 'white', paddingBottom: '10px' }}>Loading...</h3>}

            {!data && <div style={{ 'textAlign': 'center', 'color': 'white', width: '100%' }}>
                <p>{error}</p>
                <Button variant="primary" onClick={() => fetchData('6 Months', 180)}>Refresh</Button>
            </div>}

            {data && <div style={{ backgroundColor: 'black', width: '100%', textAlign: 'center', paddingTop: 10 }}>
                <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        {dayRangeString}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => fetchData('6 Months', 180)}>6 Months</Dropdown.Item>
                        <Dropdown.Item onClick={() => fetchData('1 Year', 365)}>1 Year</Dropdown.Item>
                        <Dropdown.Item onClick={() => fetchData('2 Years', 700)}>2 years</Dropdown.Item>
                        {/* <Dropdown.Item onClick={() => fetchData('5 Years', 1825)}>5 Years</Dropdown.Item> */}
                    </Dropdown.Menu>
                </Dropdown>
                <br></br>
                <Chart
                    options={data.options}
                    series={data.series}
                    type="line"
                    height="500"
                />

            </div>}

            {smaLarge && smaLarge && smaSmall > smaLarge && <h1 style={{ color: 'lime' }}>  HEALTHY </h1>}

            {smaLarge && smaLarge && smaSmall <= smaLarge && <h1 style={{ color: 'red' }}>  SICK </h1>}

        </React.Fragment>
    );

    async function fetchData(rangeString, range)
    {
        setLoading(true)
        const stockData = await fetchStock(range);


        if (stockData.message)
        {
            setError(stockData.message)
            setLoading(false)
            return
        }

        const bBands = await fetchBBands(range);
        const sma50 = await fetchSMA(50, range);
        const sma100 = await fetchSMA(200, range);

        if (!sma50 || !sma100 | !bBands)
        {
            setLoading(false)
            return
        }

        setDayRangeString(rangeString)
        setSmaSmall(Number(sma50[sma50.length - 1].sma))
        setSmaLarge(Number(sma100[sma100.length - 1].sma))
        const chartData = {

            options: {
                title: {
                    text: 'S&P 500',
                    style: {
                        color: 'white'
                    },
                    align: 'center'
                },
                chart: {
                    id: "basic-line"
                },
                xaxis: {
                    categories: stockData.map(dates => dates.datetime),
                    labels: {
                        hideOverlappingLabels: true,
                        offsetX: 20,
                        offsetY: -3,
                        style: {
                            colors: 'white'
                        }
                    },
                    axisTicks: {
                        show: true,
                        borderType: 'solid',
                        color: 'grey',
                        height: 6,
                        offsetX: 5,
                        offsetY: 0
                    },
                    tickAmount: 10
                },
                stroke: {
                    show: true,
                    curve: 'smooth',
                    lineCap: 'butt',
                    width: [3, 2, 2, 1, 1],
                    dashArray: [0, 0, 0, 5, 5]
                },
                colors: ['#06c804', '#0000ff', '#ff3d00', '#FFF', '#FFF'],
                yaxis: [{
                    labels: {
                        formatter: function (val)
                        {
                            return val.toFixed(0)
                        },
                        style: {
                            colors: 'white'
                        }
                    },
                    opposite: true
                }],
                legend: {
                    show: true,
                    position: 'bottom',
                    horizontalAlign: 'center',
                    floating: true,
                    labels: {
                        colors: 'white'
                    }
                }
            },
            series: [
                {
                    name: "Close",
                    data: stockData.map(v => Number(v.close)),

                },
                {
                    name: "50 SMA",
                    data: sma50.map(v => Number(v.sma))
                },
                {
                    name: "200 SMA",
                    data: sma100.map(v => Number(v.sma))
                },
                {
                    name: "Upper Band",
                    data: bBands.map(v => Number(v.upper_band))
                },
                // {
                //     name: "Mid Band",
                //     data: bBands.map(v => Number(v.middle_band))
                // },
                {
                    name: "Lower Band",
                    data: bBands.map(v => Number(v.lower_band))
                }
            ],
        };
        setData(chartData);
        setLoading(false)
    }
}
