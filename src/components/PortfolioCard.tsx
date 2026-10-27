import Image from "next/image";
import Link from "next/link";
import { Portfolio } from "../app/types/portfolio";

interface Props {
    portfolio: Portfolio;
}

const PortfolioCard = ({ portfolio }: Props) => {
    return (
        <div className="portfolio-card">
            <Image
                src={portfolio.image}
                alt={portfolio.title}
                width={500}
                height={350}
            />

            <h4>{portfolio.title}</h4>

            <p>{portfolio.category}</p>

            <p>{portfolio.description}</p>

            <Link
                href={`/portfolio/${portfolio.slug}`}
                className="btn"
            >
                View Project
            </Link>
        </div>
    );
};

export default PortfolioCard;