import React from 'react';
import styles from './edit-pane.module.css';

const EditPane = ({
  selectedItem,
  handleChangeValue,
  handleChangeColSpan,
  handleChangeTextAlign,
  handleClose,
  handleDelete,
}) => {
  return (
    <section className={styles.wrapper}>
      <button type="button" onClick={handleClose}>
        Close
      </button>
      <button type="button" onClick={handleDelete}>
        Delete
      </button>
      <label htmlFor="value">Value</label>
      <input
        id="value"
        value={selectedItem.value}
        onChange={(e) => handleChangeValue(e.target.value)}
      />

      <label htmlFor="columns">Columns</label>
      <input
        id="columns"
        type="number"
        min="1"
        max="4"
        value={selectedItem.colSpan}
        onChange={(e) => handleChangeColSpan(e.target.value)}
      />

      <label htmlFor="textAlign">TextAlign</label>
      <select
        value={selectedItem.textAlign}
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
