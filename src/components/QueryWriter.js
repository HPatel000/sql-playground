'use client';
import { useAppContext } from '@/app/context';
import { useCallback, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { sql } from '@codemirror/lang-sql';

export default function QueryWriter({ setQueryRes, setQueryError }) {
  const [query, setQuery] = useState('');
  const { runQuery } = useAppContext();

  const onChange = useCallback((val, viewUpdate) => {
    setQuery(val);
  }, []);

  const handleClick = async () => {
    try {
      const result = await runQuery(query);
      if (result.data) {
        setQueryRes(result.data);
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
    <div className='h-100'>
      <CodeMirror
        height='200px'
        extensions={[sql()]}
        theme={vscodeDark}
        onChange={onChange}
      />
      <button onClick={handleClick}>Run!</button>
    </div>
  );
}
