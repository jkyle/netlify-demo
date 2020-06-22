import React from 'react';
import styles from './page.module.css';
import Item from './item';

const Page = ({
  grid,
  items,
  handleCreateItem,
  selectedItemId,
  setSelectedItemId,
}) => {
  return (
    <div className={styles.page}>
      <div className={styles.trim}>
        <div className={styles.safeArea}>
          {Object.values(grid).map((cell) => (
            <div
              key={cell.id}
              className={styles.cell}
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
              onKeyPress={() => handleCreateItem(cell)}
              onClick={() => handleCreateItem(cell)}
            />
          ))}

          {Object.values(items).map((item) => {
            return (
              <Item
                key={item.id}
                item={item}
                setSelectedItemId={setSelectedItemId}
                selectedItemId={selectedItemId}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Page;
