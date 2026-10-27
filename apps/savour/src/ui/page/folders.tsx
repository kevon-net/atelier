'use client';

import React from 'react';
import { useCrudFolders } from '@savour/hooks/crud/folders';

export default function PageFolders() {
  const { data, error, loading, addFolder } = useCrudFolders();

  return (
    <div>
      PageFolders
      <div>
        <div>Error: {JSON.stringify(error)}</div>
        <div>Data: {loading ? 'loading' : JSON.stringify(data)}</div>
      </div>
      <div>
        <button onClick={() => addFolder()}>add new folder</button>
      </div>
    </div>
  );
}
