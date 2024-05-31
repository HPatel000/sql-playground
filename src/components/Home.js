'use client';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { QueryResult } from './QueryResult';
import { ScrollArea } from './ui/scroll-area';
import QueryWriter from './QueryWriter';
import { useState } from 'react';

export default function Home() {
  const [queryRes, setQueryRes] = useState([]);
  const [queryError, setQueryError] = useState([]);
  return (
    <ResizablePanelGroup
      direction='horizontal'
      className='w-screen rounded-lg border'
    >
      <ResizablePanel defaultSize={25}>
        <ScrollArea className='px-4 py-2 h-full overflow-auto'>
          <span className='font-semibold'>One</span>
        </ScrollArea>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={75}>
        <ResizablePanelGroup direction='vertical'>
          <ResizablePanel defaultSize={75}>
            <ScrollArea className='px-4 py-2 h-full overflow-auto'>
              <QueryWriter
                setQueryRes={setQueryRes}
                setQueryError={setQueryError}
              />
            </ScrollArea>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={25}>
            <ScrollArea className='px-4 py-2 h-full overflow-auto'>
              <QueryResult data={queryRes} error={queryError} />
            </ScrollArea>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
