import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom';
import jQuery from "jquery";
Object.assign(window, { $: jQuery, jQuery });
import * as DataTable from "datatables.net-dt";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { use } from 'react'

function getHeadings(data) {
  return Object.keys(data[0]).map(key => {
    return <td>{key}</td>;
  });
}

// `map` over the data to return
// row data, passing in each mapped object
// to `getCells`
function getRows(data) {
  return data.map(obj => {
    return <tr>{getCells(obj)}</tr>;
  });
}

// Return an array of cell data using the
// values of each object
function getCells(obj) {
  return Object.values(obj).map(value => {
    return <td>{value}</td>;
  });
}

// Simple component that gets the
// headers and then the rows
function Example({ data }) {
  return (
    <table className="table-bordered">
      <thead><tr>{getHeadings(data)}</tr></thead>
      <tbody>{getRows(data)}</tbody>
    </table>
  );
}
function Browse({tb}){
  const [data,setData] = useState(null)
  useEffect(() => {
    fetch('/api/browse?tb='+tb)
      .then(response => response.json())
      .then(info => setData(info))        
      .catch(error => {
        console.error('Error fetching data from backend:', error);
      });
  }, [tb]);

  return (
    <div>
      {data ? Example({ data }) :
        <p>Loading data...</p>
      }
    </div>
  );
}
function App() {  
  const [table,setTable] = useState('customer');
  
  return (
    <div>
      <div className="Navbar">Table: {table}</div>
      <nav>
        <ul className="Navbar nav-list flex-row">
          <li className="nav-item" onClick={() => setTable('customer')}>Customer</li>
          <li className="nav-item" onClick={() => setTable('branch')}>Branch</li>
          <li  className="nav-item" onClick={() => setTable('category')}>Category</li>
        </ul>
      </nav>
      <Browse tb={table} />
    </div>
  );
}

export default App
