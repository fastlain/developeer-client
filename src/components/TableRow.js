import React from 'react';
import styles from '../css_modules/TableRow.module.css';


const TableRow = (props) => {

    const wrappedCells = props.cells.map((cell, index) => (
        <span className={styles.cell} key={index}>{cell}</span>
    ));

    return (
        <div className={styles[props.rowStyle]}>
            {wrappedCells}
        </div>
    );
}

export default TableRow;