import React, { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TableCell from './components/TableCell/TableCell';
import { getData } from './api/api';
import './App.scss';

const App = () => {
  const [fields, setFields] = useState({});
  const [field, setField] = useState('');
  const [start, setStart] = useState(false);
  const [popups, setPopups] = useState([]);

  useEffect(() => {
    getData()
      .then(data => setFields(data));
  }, []);

  const createPopup = useCallback((row, cell, controller = true) => {
    if (controller) {
      const cellPosition = [row, cell];

      setPopups((current) => {
        return [...current, cellPosition];
      });

      return;
    }

    setPopups((current) => {
      return current.filter(element => (
        element[0] !== row || element[1] !== cell
      ));
    });
  }, []);

  const createField = (fieldSize) => {
    const arr = [];

    for (let i = 1; i <= fieldSize; i++) {
      arr.push(i);
    }

    const table = arr.map((item, index) => {
      return (
        <tr
          key={item}
          className="field__row"
        >
          {arr.map(element => (
            <TableCell
              key={element}
              cell={element}
              row={index + 1}
              onCreatePopup={createPopup}
            />
          ))}
        </tr>
      );
    });

    return table;
  };

  return (
    <div className="app">
      <div>
        <div className="app__header">
          <select
            value={field}
            onChange={(event) => {
              setField(event.target.value);
              setStart(false);
            }}
            className="app__selector"
          >
            <option
              value=""
              disabled
            >
              Pick mode
            </option>
            {Object.keys(fields).map(key => (
              <option
                key={key}
                value={fields[key].field}
              >
                {key}
              </option>
            ))}

          </select>

          <button
            type="button"
            onClick={() => (
              setStart(true)
            )}
            className="app__button"
          >
            START
          </button>
        </div>

        {field && start && (
          <table className="field">
            <tbody className="field__body">
              {createField(field)}
            </tbody>
          </table>
        )}
      </div>

      {field && start && (
        <div className="popups">
          <h1>Hover squares</h1>
          {popups.map(popup => (
            <div
              key={uuidv4()}
              className="popups__item"
            >
              {`row ${popup[0]} col ${popup[1]}`}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
