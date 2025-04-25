import React, { useState, useEffect, useRef } from 'react';

import ChartConstants from './chaoschart/ChartConstants.js';
import ChaosChart from './ChaosChart.jsx';

import moduleStyle from './ChaosChartTable.module.css';

import sample from './sample2.json';

/**
 * ChaosChartTable object
 * 
 * @author 9ins
 * @param {*} param0 
 * @returns 
 */
function ChaosChartTable({ 
    type = ChartConstants.CHART.BAR, 
    width = 800, 
    height = 600, 
    config = sample,                            
    title = 'ChaosChartTable sample',
    readOnly = false,
    styles = moduleStyle,
}) {

    const [chartTitle, setChartTitle] = useState(title);
    const [chartConfig, setChartConfig] = useState(config);
    const [xIndex, setXIndex] = useState(config.xIndex);

    const [chart, setChart] = useState(null);
    const [canvas, setCanvas] = useState(null);

    const tableRef = useRef(null);

    /**
     * Effect for table value change event
     */
    useEffect(() => {
        if (!readOnly) {
            const handleWheel = (event) => {
                event.preventDefault();
                const { target } = event;

                if (target.tagName === "TD" && chart && target.dataset.row) {
                    console.log(target.tagName+"  "+target.dataset.col);
                    const key = target.dataset.row;
                    const index = Number(target.dataset.col);
                    const delta = event.deltaY > 0 ? -chart.getWheelDelta() : chart.getWheelDelta();

                    setChartConfig((prevConfig) => {
                        const newConfig = { ...prevConfig };
                        if(index === -1) {
                            newConfig.elements[key].values = newConfig.elements[key].values.map(v => v+delta);
                        } else {
                            newConfig.elements[key].values[index] += delta;
                        }
                        return newConfig;
                    });
                    if(index === -1) {
                        chart.setElementValues(key, chartConfig.elements[key].values);
                    } else {
                        chart.setElementValue(key, index, chartConfig.elements[key].values[index]);
                    }
                }
            };

            const table = tableRef.current;
            table.addEventListener("wheel", handleWheel, { passive: false });

            if (chart) {
                chart.addSelectedCallback((selectedElement) => {
                    setChartConfig((prevConfig) => {
                        const newConfig = { ...prevConfig };
                        newConfig.elements[selectedElement.elementName].values[selectedElement.selectedValueIndex] = selectedElement.getSelectedValue();
                        newConfig.elements[selectedElement.elementName].color = selectedElement.getElementColor();
                        return newConfig;
                    });
                });
            }

            return () => {
                table.removeEventListener("wheel", handleWheel);
            };
        }
    }, [chart, chartConfig]);

    /**
     * Save chart image
     */
    const saveChartImage = () => {
        if (!canvas) return;
        
        canvas.toBlob((blob) => {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = chartTitle + ".png";
            link.click();
            URL.revokeObjectURL(link.href);
        }, "image/png");
    };

    return (
        <div className={styles.chartContainer}>
            <h3>{chartTitle}</h3>
            <ChaosChart 
                type={type} 
                width={width} 
                height={height} 
                title={chartTitle} 
                styles={styles} 
                readOnly={readOnly} 
                config={chartConfig} 
                setParentChart={setChart}
                setParentCanvas={setCanvas}
            />

            <div id="elementColorPickerContainer" className={styles.chartColorPicker}>
                <input type="color"/>
            </div>
            <div className={styles.chartTableContainer}>
                <table ref={tableRef} width={width}>
                    <thead>
                        <tr>
                            <th>Element Name</th>
                            {xIndex.map((e, idx) => (
                                <th key={idx}>{e}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(chartConfig.elements).map(([key, element]) => (
                            <tr key={key} style={{ color: element.color }}>
                                <td key={key} data-row={key} data-col={-1}>{key}</td>
                                {element.values.map((val, idx) => (
                                    <td key={idx} data-row={key} data-col={idx} style={{ cursor: "pointer", userSelect: "none" }}>
                                        {val.toFixed(2)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button className={styles.chartButtons} onClick={saveChartImage}>Save image</button>
        </div>
    );
}

export default ChaosChartTable;
