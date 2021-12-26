import logo from './logo.svg';
import { useState, useRef, memo, useEffect, useCallback } from 'react';
import './App.css';

// <Row />
// ------
function Row(props) {
  console.log('props.internalAllow', props.internalAllow);
  let [isHovered, setIsHovered] = useState(false);
  let [alwaysHovered, setAlwaysHovered] = useState(false);

  useEffect(() => {
    console.log('new props', props);
  }, [props]);

  const onMouseEnter = ({ target }) => {
    setIsHovered(true);
    console.log('hovering', target, 'and the status is', props.allowHover);
  };
  const onMouseLeave = ({ target }) => {
    setIsHovered(false);
    console.log('unhovering', target);
  };
  const showPermanently = () => {
    setAlwaysHovered(!alwaysHovered);
  };

  console.log('RENDERING ROW', props.allowHover);
  return (
    <tr key={props.id} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <td style={{ border: '1px solid red' }}>---------------- {props.id}</td>
      <td>{JSON.stringify(isHovered)}</td>
      <td>{JSON.stringify(props.allowHover)}</td>
      <td>
        <button onClick={showPermanently}>toggle actions</button>
      </td>
      <td style={{ border: '1px solid green' }}>
        {(props.allowHover.current && isHovered) || alwaysHovered ? (
          <button>ACTIONS</button>
        ) : null}
      </td>
    </tr>
  );
}

const MemoizedRows = memo(function AllRows(props) {
  return [1, 2, 3, 4, 5, 6, 7, 8].map((id) => (
    <Row
      key={id}
      id={id}
      internalAllow={props.internalAllow}
      allowHover={props.allowHover}
    />
  ));
});
1;

// <TableContainer />
// ------
function TableContainer() {
  const allowHover = useRef(false);
  const myRef = useRef(0);

  let internalAllow = false;
  // let [allowHover, setAllowHover] = useState(false);

  const onMouseEnter = (e) => {
    setTimeout(() => {
      console.log('enabling allowHover');
      allowHover.current = true; // allow hovering
      // setAllowHover(true);
    }, 1000);
  };
  const onMouseLeave = (e) => {
    setTimeout(() => {
      console.log('DISabling allowHover');
      allowHover.current = false; // dont allow hovering
      // setAllowHover(false);
    }, 1000);
  };

  // setInterval(() => {
  //   myRef.current += 1;
  //   console.log(myRef);
  // }, 1000);

  useEffect(() => {
    console.log('useEffect [myRef]', myRef);
  }, [myRef]);

  return (
    <div className="App" style={{ border: '3px solid blue' }}>
      <h1>table</h1>
      {/* allow/disallow hovering when entering and exiting the table, with a delay */}
      <table onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <tbody>
          <MemoizedRows internalAllow={internalAllow} allowHover={allowHover} />
        </tbody>
      </table>
      <b>{JSON.stringify(allowHover)}</b>
    </div>
  );
}

function App() {
  return <TableContainer />;
}

export default App;
