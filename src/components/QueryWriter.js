'use client';
import { useCallback } from 'react';
import CodeMirror, { keymap } from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { sql } from '@codemirror/lang-sql';

export default function QueryWriter({ setQuery, handleQueryRun }) {
  const onChange = useCallback((val, viewUpdate) => {
    setQuery(val);
  }, []);

  return (
    <CodeMirror
      height='95vh'
      extensions={[
        sql(),
        keymap.of([
          {
            key: "Ctrl-'",
            run() {
              handleQueryRun();
            },
          },
        ]),
      ]}
      theme={vscodeDark}
      onChange={onChange}
    />
  );
}
