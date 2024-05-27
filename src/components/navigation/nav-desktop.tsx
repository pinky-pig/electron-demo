import { Link, useLocation } from 'react-router-dom';

import { cn } from '@/lib/utils';
import { NavItem } from '@/types/nav';

import { buttonVariants } from '../ui/button';

interface NavDesktopProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: NavItem[];
}

export function NavDesktop({ items, ...other }: NavDesktopProps) {
  const location = useLocation();

  return (
    <div {...other}>
      {items?.length ? (
        <ul className="hidden gap-5 lg:flex lg:items-center">
          {items.map((item, index) => {
            const isActive = item.href === location.pathname;
            return (
              item.href && (
                <Link
                  key={index}
                  to={item.href}
                  target={item.external ? '_blank' : '_self'}
                  style={item.disabled ? { pointerEvents: 'none' } : undefined}
                >
                  <li className="flex">
                    <div
                      className={cn(
                        'truncate',
                        buttonVariants({
                          size: 'sm',
                          variant: 'ghost',
                        }),
                        isActive && !item.disabled && 'bg-gray-100 dark:bg-gray-800',
                        item.disabled && 'opacity-80'
                      )}
                    >
                      {item.title}
                    </div>
                  </li>
                </Link>
              )
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
