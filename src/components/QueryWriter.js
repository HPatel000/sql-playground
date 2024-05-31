'use client';
import { useAppContext } from '@/app/context';
import { useState } from 'react';

export default function QueryWriter({ setQueryRes, setQueryError }) {
  const [query, setQuery] = useState('');
  const { runQuery } = useAppContext();

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleClick = async () => {
    try {
      const result = await runQuery(query);
      if (result.data) {
        setQueryRes(result.data);
        console.log(result.data);
        setQueryError(null);
      } else {
        setQueryRes([]);
        setQueryError(result.error.toString());
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <textarea
        value={query}
        onChange={handleChange}
        rows={4}
        cols={50}
        placeholder='Enter your SQL query'
      ></textarea>
      <button onClick={handleClick}>Run!</button>
    </div>
  );
}
