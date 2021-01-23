import './App.css';
import SP500 from './Components/SP500';

export default function App()
{
  return (
    <div className="container">
      <h3 class="header"> US ECONOMIC HEALTH DASHBOARD</h3>
      <div class="row">
        <div class="inner"></div>
        <div class="inner"></div>
      </div>
      <div class="content">
        <SP500 className={'card'}></SP500>
      </div>
      <div class="row">
        <div class="inner"></div>
        <div class="inner"></div>
      </div>
    </div>
  );
}

