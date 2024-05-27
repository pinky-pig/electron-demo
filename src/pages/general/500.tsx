import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import { buttonVariants } from '@/components/ui/button';
import { sitePaths } from '@/configurations/paths';

// ----------------------------------------------------------------------

export default function Page500() {
  return (
    <>
      <Helmet>
        <title> 500 Internal Server Error</title>
      </Helmet>

      <section className="flex h-screen flex-col items-center justify-center">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Oops! Internal Server Error
        </h1>
        <p className="p-4 text-center text-lg text-muted-foreground">
          Something went wrong on our end. We&apos;re working to fix it as soon as possible.
        </p>
        <p className="mb-4 p-5 text-2xl">🛠️🔥</p>
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
