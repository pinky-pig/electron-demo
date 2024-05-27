import { NavItem } from '@/types/nav';

export const sitePaths = {
  home: '/',
  pageOne: '/PageOne',
  about: '/about',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  needHelp: 'https://en.wikipedia.org/wiki/Help',
};

export const pathsArr: NavItem[] = [
  {
    title: 'Home',
    description: 'Navigate to the home page',
    href: sitePaths.home,
  },
  {
    title: 'Page One',
    description: 'Go to the first page',
    href: sitePaths.pageOne,
  },
  {
    title: 'About',
    description: 'Learn more about us',
    href: sitePaths.about,
  },
  {
    title: '403',
    description: 'Access forbidden',
    href: sitePaths.page403,
  },
  {
    title: '404',
    description: 'Page not found',
    href: sitePaths.page404,
  },
  {
    title: '500',
    description: 'Internal server error',
    href: sitePaths.page500,
  },
  {
    title: 'Google New Tab',
    description: 'Open Google in a new tab (external link)',
    href: 'https://www.google.com/',
    external: true,
  },
  {
    title: 'Disabled',
    description: 'This link is disabled',
    href: '/disabled',
    disabled: true,
  },
];

export const links = {
  twitter: 'https://twitter.com/fahddaher',
  github: 'https://github.com/Painkiller995',
  docs: 'https://ui.shadcn.com',
};
