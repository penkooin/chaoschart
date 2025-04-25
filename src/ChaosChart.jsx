import React, { useEffect, useRef, useState } from "react";

import DefaultChartFactory from "./chaoschart/factory/DefaultChartFactory.js";
import ChartConstants from './chaoschart/ChartConstants.js';
import ChartElements from './chaoschart/ChartElements.js';
import ChartElement from './chaoschart/ChartElement.js';

import defaultStyles from './ChaosChart.module.css';

/**
 * ChaosChart component
 *  
 * @author 9ins
 * @param {*} param0 
 * @returns 
 */
function ChaosChart({
    type = ChartConstants.CHART.LINE, 
    width = 800, 
    height = 500, 
    title = "", 
    readOnly = false,
    styles = defaultStyles,
    config = {}, 
    setParentChart = null,
    setParentCanvas = null,
}) {
    const [chartTitle, setChartTitle] = useState(title);    
    const canvasRef = useRef(null);
    const chartRef = useRef(null);

    useEffect(() => {
        if (canvasRef.current) {
            if(!chartRef.current) {
                chartRef.current = DefaultChartFactory.createChart(type, config, canvasRef.current);
                chartRef.current.setTitle(chartTitle);
                chartRef.current.drawChart();
                if (setParentChart) {
                    setParentChart(chartRef.current);
                }
                if (setParentCanvas) {
                    setParentCanvas(canvasRef.current);
                }                
            }
        }
    }, [setParentChart, setParentCanvas]);
    
    /**
     * Get chart elements object from json document
     * @param {*} json 
     * @returns 
     */
    function getElements(json) {
        const elements = new ChartElements(json.xIndex, json.yIndex, json.chartType);
        Object.entries(json.elements).forEach(([key, value]) => {
            elements.addElement(new ChartElement(key, value.color, value.values, null));        
        });
        return elements;
    }

    return (
        <div className={styles.chartContainer}>
            <canvas id="chaoschart" ref={canvasRef} className={styles.chartCanvas} width={width} height={height} />
            <p>Select an item and change values using mouse.</p>
        </div>
    );
}

export default ChaosChart;
