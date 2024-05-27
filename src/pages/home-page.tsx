import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import { buttonVariants } from '@/components/ui/button';
import { sitePaths } from '@/configurations/paths';

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Welcome to Our Website</title>
      </Helmet>

      <section className="container flex  h-screen flex-col items-center justify-center gap-6 pb-8 pt-10 md:py-10">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Welcome to Our Website
        </h1>

        <p className="max-w-[700px] pt-4 text-lg text-muted-foreground">
          Explore our amazing features and discover what makes us unique.
        </p>

        <p className="mb-4 pt-5 text-2xl">🚀🌐</p>
        <Link to={sitePaths.about}>
          <div
            className={buttonVariants({
              size: 'lg',
              variant: 'ghost',
            })}
          >
            Learn More About Us
          </div>
        </Link>
      </section>
    </>
  );
}
