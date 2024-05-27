'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [query, setQuery] = useState('');
  const [queryResult, setQueryResult] = useState([]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleClick = async () => {
    try {
      const result = await window.ipcRenderer.invoke('execute-sql', query);
      setQueryResult(result);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className={styles.main}>
      <div>
        <h1>Welcome to SQL Playground</h1>
        <div>
          <textarea
            value={query}
            onChange={handleChange}
            rows={4}
            cols={50}
            placeholder='Enter your SQL query'
          ></textarea>
        </div>
        <button onClick={handleClick}>Run!</button>
        <div>
          <h2>Query Results:</h2>
          <ul>
            {queryResult &&
              queryResult.map((row, index) => (
                <li key={index}>{JSON.stringify(row)}</li> // Adjust rendering based on the structure of your query result
              ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
