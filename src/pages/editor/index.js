import React, { useState } from 'react';
import range from 'lodash/range';
import uniqueId from 'lodash/uniqueId';
import _setFp from 'lodash/fp/set';
import SpecsContext from './specs-context';
import Page from './page';
import styles from './editor.module.css';
import EditPane from './edit-pane';

const specs = {
  rows: 20,
  columns: 4,
  pageWidth: 4.5,
  pageHeight: 7.125,
  margin: 0.5,
  trim: 0.125,
};

const buildGrid = () => {
  const grid = {};
  const safeAreaWidth = specs.pageWidth - (specs.margin + specs.trim) * 2;
  const safeAreaHeight = specs.pageHeight - (specs.margin + specs.trim) * 2;
  const cellWidth = safeAreaWidth / specs.columns;
  const rowHeight = safeAreaHeight / specs.rows;

  range(specs.rows).forEach((rowId) => {
    range(specs.columns).forEach((columnId) => {
      const cell = {
        id: `r${rowId}c${columnId}`,
        row: rowId,
        column: columnId,
        x: cellWidth * columnId,
        y: rowHeight * rowId,
        width: cellWidth,
        height: rowHeight,
        value: '',
        colSpan: 1,
        textAlign: 'LEFT',
      };
      grid[cell.id] = cell;
    });
  });

  return grid;
};

const Editor = () => {
  const [selectedItemId, setSelectedItemId] = useState(false);
  const grid = buildGrid();
  const [items, setItems] = useState({});

  const handleChangeValue = (newValue) => {
    const newItems = _setFp([selectedItemId, 'value'], newValue, items);
    setItems(newItems);
  };

  const handleChangeColSpan = (newValue) => {
    const newItems = _setFp(
      [selectedItemId, 'colSpan'],
      parseInt(newValue, 10),
      items
    );
    setItems(newItems);
  };

  const handleChangeTextAlign = (newValue) => {
    const newItems = _setFp([selectedItemId, 'textAlign'], newValue, items);
    setItems(newItems);
  };

  const handleCreateItem = (cell) => {
    const id = uniqueId();
    const item = {
      id,
      row: cell.row,
      column: cell.column,
      rowSpan: 1,
      colSpan: 1,
      value: '',
      textAlign: 'LEFT',
    };

    setItems({ ...items, [id]: item });
    setSelectedItemId(id);
  };

  const handleClose = () => {
    if (items[selectedItemId].value === '') {
      handleDelete();
    } else {
      setSelectedItemId(false);
    }
  };

  const handleDelete = () => {
    const newItems = { ...items };
    delete newItems[selectedItemId];
    setSelectedItemId(false);
    setItems(newItems);
  };

  return (
    <SpecsContext.Provider value={specs}>
      <main className={styles.main}>
        <section className={styles.left}>Foo</section>
        <section className={styles.center}>
          <Page
            grid={grid}
            items={items}
            selectedItemId={selectedItemId}
            setSelectedItemId={setSelectedItemId}
            handleCreateItem={handleCreateItem}
          ></Page>
        </section>
        <section className={styles.right}>
          {items[selectedItemId] && (
            <EditPane
              selectedItem={items[selectedItemId]}
              handleChangeColSpan={handleChangeColSpan}
              handleChangeValue={handleChangeValue}
              setSelectedItemId={setSelectedItemId}
              handleChangeTextAlign={handleChangeTextAlign}
              handleClose={handleClose}
              handleDelete={handleDelete}
            ></EditPane>
          )}
        </section>
      </main>
    </SpecsContext.Provider>
  );
};

export default Editor;
