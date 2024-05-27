import { useState } from 'react';
import { Link } from 'react-router-dom';

import { links, pathsArr, sitePaths } from '@/configurations/paths';

import { Icons } from '../icons';
import { HeaderLogo } from '../logo';
import { Navigator } from '../navigation';
import { ModeToggle } from '../theme-provider';
import { buttonVariants } from '../ui/button';

interface SiteHeaderProps {
  useNav?: boolean;
  useHelp?: boolean;
}

export default function SiteHeader({ useNav = true, useHelp = false }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center  overflow-hidden px-6 sm:justify-between sm:gap-6 sm:space-x-0">
        {useNav ? <Navigator /> : null}

        <div className="flex flex-1 justify-end space-x-4">
          {useHelp ? (
            <nav className="flex space-x-1">
              <Link to={sitePaths.needHelp} target="_blank">
                <span className="inline-block font-bold">Need help?</span>
              </Link>
            </nav>
          ) : (
            <>
              <nav className="flex space-x-1">
                <div
                  className={buttonVariants({
                    size: 'icon',
                    variant: 'ghost',
                  })}
                >
                  <Link to={links.github} target="_blank">
                    <Icons.GitHub className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </Link>
                </div>

                <div
                  className={buttonVariants({
                    size: 'icon',
                    variant: 'ghost',
                  })}
                >
                  <Link to={links.twitter} target="_blank">
                    <Icons.Twitter className="h-5 w-5 fill-current" />
                    <span className="sr-only">Twitter</span>
                  </Link>
                </div>
              </nav>
              <ModeToggle />
            </>
          )}
        </div>
      </div>
    </header>
  );
}
