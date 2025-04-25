import React from 'react';
import ReactDOM from 'react-dom/client';

import ChartConstants from './chaoschart/ChartConstants.js';

import ChaosChart from './ChaosChart.jsx';
import ChaosChartTable from './ChaosChartTable.jsx';
import ChaosChartInputElement from './ChaosChartInputElement.jsx';

import indexStyle from './index.module.css';

import defaultStyle from './DefaultChartStyle.module.css';

import json2 from './sample2.json';
import json from './sample.json';


const root = ReactDOM.createRoot(document.getElementById('root'));

const chartWidth = 800;
const chartHeight = 400;

root.render(
  <React.StrictMode>
    <div className={indexStyle.titleContainer}>
      <p> ChaosChart React Library<br/> v0.0.1</p>
      <p> ©️ All right reserved by author Kooin Shin.</p>
    </div>    

    <ChaosChart type={ChartConstants.CHART.AREA} width={chartWidth} height={chartHeight} config={json} readOnly={false} styles={defaultStyle} />
    <ChaosChartTable type={ChartConstants.CHART.LINE} width={chartWidth} height={chartHeight} config={json2} readOnly={false} styles={defaultStyle} />
    {/* <ChaosChartInputElement type={ChartConstants.CHART.CIRCLE} width={chartWidth} height={chartHeight} chartElements={{}} readOnly={false} styles={defaultStyle} /> */}
  </React.StrictMode>
);

