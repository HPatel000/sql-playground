import { Zap } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
export default function Actionbar({ handleQueryRun }) {
  return (
    <div className='px-2 py-1 w-100 actionbar'>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Zap size={18} className='actionIcon' onClick={handleQueryRun} />
          </TooltipTrigger>
          <TooltipContent>
            <p>Ctrl + '</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
