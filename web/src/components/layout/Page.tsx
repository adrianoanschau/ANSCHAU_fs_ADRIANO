import { PropsWithChildren } from "react";

type PageProps = {
  id: string;
  title: string;
  subtitle?: string;
};

export default function Page({
  id,
  title,
  subtitle,
  children,
}: PropsWithChildren<PageProps>) {
  return (
    <main id="main" className="bg-teal-500 px-40 py-5">
      <div className="block rounded-lg bg-teal-50 p-2">
        <section id={id}>
          <div className="border-b-2 p-2 text-center">
            <h1 className="mb-4 text-4xl font-bold">{title}</h1>
            <h4 className="text-2xl">{subtitle}</h4>
          </div>
          <>{children}</>
        </section>
      </div>
    </main>
  );
}
