export const getPosition = (item, specs) => {
  const safeAreaWidth = specs.pageWidth - (specs.margin + specs.trim) * 2;
  const safeAreaHeight = specs.pageHeight - (specs.margin + specs.trim) * 2;
  const cellWidth = safeAreaWidth / specs.columns;
  const rowHeight = safeAreaHeight / specs.rows;

  return {
    x: cellWidth * item.column,
    y: rowHeight * item.row,
    width: cellWidth * item.colSpan,
    height: rowHeight * item.rowSpan,
  };
};
