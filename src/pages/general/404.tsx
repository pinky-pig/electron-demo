import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import { buttonVariants } from '@/components/ui/button';
import { sitePaths } from '@/configurations/paths';

// ----------------------------------------------------------------------

export default function Page404() {
  return (
    <>
      <Helmet>
        <title>Oops! Page not found</title>
      </Helmet>

      <section className="flex h-screen flex-col items-center justify-center">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Oops! Page not found
        </h1>
        <p className="p-4 text-center text-lg text-muted-foreground">
          The page you are looking for might be in another castle.
        </p>
        <p className="mb-4 p-5 text-2xl">🏰🔍</p>
        <Link to={sitePaths.home}>
          <div
            className={buttonVariants({
              size: 'lg',
              variant: 'ghost',
            })}
          >
            Go Back Home
          </div>
        </Link>
      </section>
    </>
  );
}
