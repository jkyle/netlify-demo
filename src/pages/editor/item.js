import React, { useContext } from 'react';
import clsx from 'clsx';
import SpecsContext from './specs-context';
import { getPosition } from './layout-helpers';
import style from './item.module.css';

const Item = ({ item, setSelectedItemId, selectedItemId }) => {
  const specs = useContext(SpecsContext);
  const position = getPosition(item, specs);
  console.log({ item, position });

  return (
    <div
      className={clsx({
        [style.item]: true,
        [style.selected]: item.id === selectedItemId,
      })}
      style={{
        left: `${position.x}in`,
        top: `${position.y}in`,
        height: `${position.height}in`,
        width: `${position.width}in`,
        justifyContent: `${
          item.textAlign === 'LEFT'
            ? 'flex-start'
            : item.textAlign === 'RIGHT'
            ? 'flex-end'
            : 'center'
        }`,
      }}
      role="button"
      tabIndex={0}
      onKeyPress={() => setSelectedItemId(item.id)}
      onClick={() => setSelectedItemId(item.id)}
    >
      {item.value}
    </div>
  );
};

export default Item;
