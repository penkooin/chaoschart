import React, { useState } from 'react';
import ChartConstants from './chaoschart/ChartConstants.js';

import ChaosChart from './ChaosChart.jsx';

import defaultStyles from './ChaosChartInputElement.module.css';

function ChaosChartInputElement({ 
    type = ChartConstants.CHART.BAR, 
    width = 900, 
    height = 400, 
    config = {},                            
    title = 'Monthly Infra Usage',
    readOnly = true,
    styles = defaultStyles,
}) {
    const [chartStyles, setChartStyles] = useState(styles);
    const [chartNames, setChartNames] = useState(Object.keys(ChartConstants.CHART));
    const [xAxisCount, setXAxisCount] = useState(0);

    return (
        <div className={styles.chartContainer}>
            <ChaosChart type={type} width={width} height={height} config={config} title={title} readOnly={readOnly} styles={styles} />
            <div className={chartStyles.inputContainer}>
                <p>Select Chart
                    <select>
                        <option value="">select a chart</option>
                        {
                            chartNames.map((c) => (<option key={c} value={c}>{c}</option>))
                        }
                    </select>
                </p>
                <p>Input Element Name                
                    <input type="text" />
                </p>
                <p>Input Number of x-axis count
                    <input 
                        type="number" 
                        value={xAxisCount} 
                        onChange={(e) => setXAxisCount(e.target.value)} 
                    />
                </p>
            </div>
        </div>
    );
}

export default ChaosChartInputElement;
