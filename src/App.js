import './App.css';
import SP500 from './Components/SP500';

export default function App()
{
  return (
    <div className="container">
      <h3 className="header">STOCK MARKET HEALTH DASHBOARD</h3>
      <div className="flex-r">
        <div className="inner"></div>
        <div className="inner"></div>
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

