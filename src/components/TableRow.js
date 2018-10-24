import React from 'react';
import styles from '../css_modules/TableRow.module.css';


const TableRow = (props) => {

    const wrappedCells = props.cells.map((cell, index) => (
        <span className={styles.cell} key={index}>{cell}</span>
    ));

    // concatenate "row" and capitalized rowStyle prop
    const rowStyle = `row${props.rowStyle.charAt(0).toUpperCase()}${props.rowStyle.slice(1)}`;
    const className = styles[rowStyle];

    return (
        <div className={className}>
            {wrappedCells}
        </div>
    );
}

export default TableRow;