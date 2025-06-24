import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { use } from 'react'

function App() {
  const [data,setData] = useState(null)
  useEffect(() => {
    fetch('/api/data')
      .then(response => response.json())
      .then(info => setData(info))        
      .catch(error => {
        console.error('Error fetching data from backend:', error);
      });
  }, []);

  return (
    <>
    <div>
      <h1>MERN on Docker</h1>
      <div><p>Data from backend</p></div>
      <pre>
        {data ? JSON.stringify(data, null, 2) : 'Loading...'}
      </pre>
    </div>
    </>
  )
}

export default App
