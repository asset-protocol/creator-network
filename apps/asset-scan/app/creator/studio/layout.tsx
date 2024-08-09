import React from 'react';

import { CreatorMenus } from '../_components/CreatorMenus';
import { StudioHeader } from '../_components/StudioHeader';
export default function ({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex mt-6 gap-4">
      <div className="flex-shrink-0 w-[240px] justify-center">
        <StudioHeader className="w-full flex flex-col items-center justify-center gap-2" />
        <CreatorMenus className="mt-6" />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
