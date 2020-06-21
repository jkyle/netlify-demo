import React from 'react';
import clsx from 'clsx';
import styles from './page.module.css';

const Page = ({ grid, selectedCell, setSelectedCell }) => {
  return (
    <div className={styles.page}>
      <div className={styles.trim}>
        <div className={styles.safeArea}>
          {Object.values(grid).map((cell) => (
            <div
              key={cell.id}
              className={clsx({
                [styles.cell]: true,
                [styles.value]: cell.value.length > 0,
                [styles.selected]: selectedCell === cell.id,
              })}
              style={{
                left: `${cell.x}in`,
                top: `${cell.y}in`,
                height: `${cell.height}in`,
                width: `${cell.width * cell.colSpan}in`,
                justifyContent: `${
                  cell.textAlign === 'LEFT'
                    ? 'flex-start'
                    : cell.textAlign === 'RIGHT'
                    ? 'flex-end'
                    : 'center'
                }`,
              }}
              role="button"
              tabIndex={0}
              onKeyPress={() => setSelectedCell(cell.id)}
              onClick={() => setSelectedCell(cell.id)}
            >
              {cell.value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
