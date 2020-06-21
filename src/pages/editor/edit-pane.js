import React from 'react';
import styles from './edit-pane.module.css';

const EditPane = ({
  selectedCell,
  handleChangeValue,
  handleChangeColSpan,
  handleChangeTextAlign,
}) => {
  return (
    <section className={styles.wrapper}>
      <label htmlFor="value">Value</label>
      <input
        id="value"
        value={selectedCell.value}
        onChange={(e) => handleChangeValue(e.target.value)}
      />

      <label htmlFor="columns">Columns</label>
      <input
        id="columns"
        type="number"
        min="1"
        max="4"
        value={selectedCell.colSpan}
        onChange={(e) => handleChangeColSpan(e.target.value)}
      />

      <label htmlFor="textAlign">TextAlign</label>
      <select
        value={selectedCell.textAlign}
        onChange={(e) => handleChangeTextAlign(e.target.value)}
      >
        <option>LEFT</option>
        <option>RIGHT</option>
        <option>CENTER</option>
      </select>
    </section>
  );
};

export default EditPane;
