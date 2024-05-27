import React, { useEffect } from 'react';

import { cn } from '@/lib/utils';
import { NavItem } from '@/types/nav';

interface NavMobileProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: NavItem[];
  open: boolean;
}

export function NavMobile({ items, open }: NavMobileProps) {
  useEffect(() => {
    if (open) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [open]);

  return (
    <ul
      className={cn(
        'fixed left-0  top-16 z-50 grid h-screen w-full gap-3 overflow-scroll bg-background p-5 pb-40 md:grid-cols-2',
        { hidden: !open }
      )}
    >
      {items
        ? items.map((item) => (
            <ListItem
              key={item.title}
              title={item.title}
              href={item.href}
              style={item.disabled ? { pointerEvents: 'none' } : undefined}
            >
              {item.description}
            </ListItem>
          ))
        : null}
    </ul>
  );
}

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
  ({ className, title, children, ...props }, ref) => (
    <li>
      <a
        ref={ref}
        className={cn(
          'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
          className
        )}
        {...props}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
      </a>
    </li>
  )
);
ListItem.displayName = 'ListItem';
