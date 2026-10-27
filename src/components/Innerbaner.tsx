"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import breadcrumbset from "../../public/img/breadcrumb.jpg"

interface InnerBannerProps {
  title?: string;
}

const InnerBanner = ({ title }: InnerBannerProps) => {
  const pathname = usePathname();

  const paths = pathname.split("/").filter(Boolean);

  return (
    <section className="inner-banner">
      <div className="imges">
        <Image src={breadcrumbset} alt="" />
      </div>
      <div className="container">
        <div className="page-contents">
          <h1>{title || paths[paths.length - 1]}</h1>

          <nav>
            <ul className="breadcrumb">
              <li>
                <Link href="/">Home</Link>
              </li>

              {paths.map((segment, index) => {
                const href = "/" + paths.slice(0, index + 1).join("/");

                const label = segment
                  .replace(/-/g, " ")
                  .replace(/\b\w/g, (char) => char.toUpperCase());

                return (
                  <li key={href}>
                    <span> / </span>

                    {index === paths.length - 1 ? (
                      <span>{label}</span>
                    ) : (
                      <Link href={href}>{label}</Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default InnerBanner;