import logo from './logo.svg';
import { useState, useRef, memo, useEffect, useCallback } from 'react';
import './App.css';

// <Row />
// ------
function Row(props) {
  const [isHovered, setIsHovered] = useState(false);
  const [permaHover, setPermaHover] = useState(false);
  const [enterTimeout, setEnterTimeout] = useState(null);

  console.log('lastEntered', props.lastEntered, 'lastExited', props.lastExited);

  function handleToggle() {
    setPermaHover(!permaHover);
  }

  return (
    <tr
      onMouseEnter={() => {
        props.lastEntered.current = new Date().getTime();
        setEnterTimeout(
          setTimeout(() => {
            setIsHovered(true);
          }, 1000)
        );
      }}
      onMouseLeave={() => {
        props.lastExited.current = new Date().getTime();
        setEnterTimeout(
          setTimeout(() => {
            setIsHovered(false);
          }, 1000)
        );
      }}
    >
      <td style={{ border: '1px solid red' }}>------> ID {props.id}</td>
      <td>
        <button onClick={handleToggle}>toggle</button>
      </td>
      <td style={{ border: '1px solid green' }}>
        <i>{isHovered || permaHover ? 'hiddenstuff' : null}</i>
      </td>
    </tr>
  );
}

const MemoizedRows = memo(function AllRows(props) {
  return [1, 2, 3, 4, 5, 6, 7, 8].map((id) => (
    <Row
      key={id}
      id={id}
      lastEntered={props.lastEntered}
      lastExited={props.lastExited}
    />
  ));
});

// <TableContainer />
// ------
function TableContainer() {
  const lastEntered = useRef(0);
  const lastExited = useRef(0);

  function onMouseEnter() {
    lastEntered.current = new Date().getTime();
  }
  function onMouseLeave() {
    lastExited.current = new Date().getTime();
  }

  return (
    <div className="App" style={{ border: '3px solid blue' }}>
      <h1>table</h1>
      <table>
        <tbody>
          <MemoizedRows
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            lastEntered={lastEntered}
            lastExited={lastExited}
          />
        </tbody>
      </table>
    </div>
  );
}

function App() {
  return <TableContainer />;
}

export default App;
