import React from 'react';
import classNames from 'classnames/bind';
import styles from '../css_modules/TableRow.module.css';
const cx = classNames.bind(styles);

const TableRow = (props) => {

    const wrappedCells = props.cells.map((cell, index) => (
        <span className={styles.cell} key={index}>{cell}</span>
    ));

    return (
        <div className={cx(props.rowStyle.split(' '))}>
            {wrappedCells}
        </div>
    );
}

export default TableRow;