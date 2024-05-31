'use client';
import { useAppContext } from '@/app/context';
import { useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [queryResult, setQueryResult] = useState([]);
  const [queryError, setQueryError] = useState([]);
  const { runQuery, userState } = useAppContext();

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleClick = async () => {
    try {
      const result = await runQuery(query);
      if (result.data) {
        setQueryResult(result.data);
        setQueryError(null);
      } else {
        setQueryResult([]);
        setQueryError(result.error.toString());
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <h1>Welcome to SQL Playground : {userState.username}</h1>
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
              <li key={index}>{JSON.stringify(row)}</li>
            ))}
          {queryError && <li>{queryError}</li>}
        </ul>
      </div>
    </div>
  );
}
