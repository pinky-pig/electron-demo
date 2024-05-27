import { Link } from 'react-router-dom';

import { sitePaths } from '@/configurations/paths';

import { Icons } from '../icons';

export const HeaderLogo = () => (
  <Link className=" hidden gap-5 pr-8 lg:flex lg:items-center" to={sitePaths.home}>
    <Icons.Logo className="h-6 w-6" />
  </Link>
);
