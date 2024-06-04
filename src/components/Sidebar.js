'use client';
import { SHOWDATABASES, SHOWTABLESOFDB } from '@/app/constants';
import { useAppContext } from '@/app/context';
import { RichTreeView, useTreeViewApiRef } from '@mui/x-tree-view';
import { Children, useEffect, useState } from 'react';

export default function Sidebar() {
  const apiRef = useTreeViewApiRef();
  const [databases, setDatabases] = useState([]);
  const { runQuery } = useAppContext();
  useEffect(() => {
    showDatabases();
  }, []);

  const showDatabases = async () => {
    const res = await runQuery(SHOWDATABASES);
    const dbs = [];
    if (res && res.data) {
      res.data.map((db, index) => {
        dbs.push({
          id: db.Database,
          label: db.Database,
          children: [
            {
              id: `db.Database_${index}`,
              label: '1',
            },
          ],
        });
      });
    }
    setDatabases(dbs);
  };
  const getTabelsListOfDB = async (event, itemId) => {
    if (itemId == null) {
      setSelectedItem(null);
    } else {
      const currDB = apiRef.current.getItem(itemId);
      const res = await runQuery(SHOWTABLESOFDB(currDB.label));
      const tables = [];
      const key = `Tables_in_${currDB.label}`;
      res.data.map((table) => {
        tables.push({
          id: `${table[key]}_${currDB.label}`,
          label: table[key],

          children: [],
        });
      });
      for (let i = 0; i < databases.length; i++) {
        if (databases[i].label == currDB.label) {
          databases[i].children = tables;
        }
      }

      setDatabases([...databases]);
    }
  };

  const handleItemExpansionToggle = (event, itemId, isExpanded) => {
    if (isExpanded) getTabelsListOfDB(event, itemId);
  };
  return (
    <div className='sidebar card flex justify-content-center'>
      <RichTreeView
        items={databases}
        apiRef={apiRef}
        onItemExpansionToggle={handleItemExpansionToggle}
      />
    </div>
  );
}
