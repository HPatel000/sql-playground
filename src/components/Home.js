'use client';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { useState } from 'react';
import { ScrollArea } from './ui/scroll-area';
import { useAppContext } from '@/app/context';
import QueryResult from './QueryResult';
import QueryWriter from './QueryWriter';
import Actionbar from './Actionbar';
import Sidebar from './Sidebar';

export default function Home() {
  const { runQuery } = useAppContext();
  const [query, setQuery] = useState();
  const [queryRes, setQueryRes] = useState([]);
  const [queryError, setQueryError] = useState([]);

  const handleQueryRun = async () => {
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
    <ResizablePanelGroup
      direction='horizontal'
      className='w-screen rounded-lg border'
    >
      <ResizablePanel defaultSize={25}>
        <ScrollArea className='px-4 py-2 h-full overflow-auto'>
          <span className='font-semibold'>
            <Sidebar />
          </span>
        </ScrollArea>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={75}>
        <ResizablePanelGroup direction='vertical'>
          <ResizablePanel defaultSize={75}>
            <Actionbar handleQueryRun={handleQueryRun} />
            <ScrollArea className='h-full overflow-auto'>
              <QueryWriter
                setQuery={setQuery}
                handleQueryRun={handleQueryRun}
              />
            </ScrollArea>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={25}>
            <ScrollArea className='p-2 h-full overflow-auto'>
              <QueryResult data={queryRes} error={queryError} />
            </ScrollArea>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
