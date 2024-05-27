import { Helmet } from 'react-helmet-async';

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Us</title>
      </Helmet>
      <section className="container grid items-center gap-6 pb-8 pt-10 md:py-10">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            Welcome to Our Company
          </h1>
          <p className="max-w-[700px] pt-4 text-lg text-muted-foreground">
            We are a dedicated team committed to providing high-quality products and services.
          </p>
        </div>
      </section>
    </>
  );
}
