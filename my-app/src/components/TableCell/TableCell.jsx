import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const TableCell = ({ cell, row, onCreatePopup }) => {
  const [selected, setSelected] = useState(false);

  console.log('rendering tablecell');

  const changeCellColor = () => {
    if (selected) {
      setSelected(false);
      onCreatePopup(row, cell, false);

      return;
    }

    setSelected(true);
    onCreatePopup(row, cell);
  };

  return (
    <>
      <td
        key={cell}
        className={classNames(
          'field__cell', { 'field__cell--selected': selected },
        )}
        onMouseOver={() => (
          changeCellColor()
        )}
      />
    </>
  );
};

TableCell.propTypes = {
  cell: PropTypes.number.isRequired,
  row: PropTypes.number.isRequired,
  onCreatePopup: PropTypes.func.isRequired,
};

export default React.memo(TableCell);
