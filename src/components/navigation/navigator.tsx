import { useState } from 'react';

import { pathsArr } from '@/configurations/paths';

import { HeaderLogo } from '../logo';
import { NavDesktop } from './nav-desktop';
import { NavMobile } from './nav-mobile';
import Squash from './navigation-button';

interface NavigatorProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Navigator = ({ ...other }: NavigatorProps) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className="flex h-16 items-center overflow-hidden" {...other}>
      <div className="lg:hidden">
        <NavMobile items={pathsArr} open={isOpen} />
        <Squash toggled={isOpen} size={20} toggle={setOpen} />
      </div>
      <HeaderLogo />
      <NavDesktop
        className="flex items-center gap-6 overflow-auto scrollbar-hide md:gap-10"
        items={pathsArr}
      />
    </div>
  );
};
