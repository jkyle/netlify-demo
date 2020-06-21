import React, { useState } from 'react';
import range from 'lodash/range';
import _setFp from 'lodash/fp/set';
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
  const [selectedCell, setSelectedCell] = useState(false);
  const [grid, setGrid] = useState(buildGrid);

  const handleChangeValue = (newValue) => {
    const newGrid = _setFp([selectedCell, 'value'], newValue, grid);
    setGrid(newGrid);
  };

  const handleChangeColSpan = (newValue) => {
    const newGrid = _setFp(
      [selectedCell, 'colSpan'],
      parseInt(newValue, 10),
      grid
    );
    setGrid(newGrid);
  };

  const handleChangeTextAlign = (newValue) => {
    const newGrid = _setFp([selectedCell, 'textAlign'], newValue, grid);
    setGrid(newGrid);
  };

  return (
    <main className={styles.main}>
      <section className={styles.left}>Foo</section>
      <section className={styles.center}>
        <Page
          grid={grid}
          selectedCell={selectedCell}
          setSelectedCell={setSelectedCell}
        ></Page>
      </section>
      <section className={styles.right}>
        {grid[selectedCell] && (
          <EditPane
            selectedCell={grid[selectedCell]}
            handleChangeColSpan={handleChangeColSpan}
            handleChangeValue={handleChangeValue}
            setSelectedCell={setSelectedCell}
            handleChangeTextAlign={handleChangeTextAlign}
          ></EditPane>
        )}
      </section>
    </main>
  );
};

export default Editor;
