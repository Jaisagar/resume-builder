import Image from "next/image";
import { Portfolio } from "../app/types/portfolio";

interface Props {
    portfolio: Portfolio;
}

const PortfolioDetails = ({ portfolio }: Props) => {
    return (
        <section className="portfolio-details">
            <Image
                src={portfolio.image}
                alt={portfolio.title}
                width={1200}
                height={700}
            />

            <h1>{portfolio.title}</h1>

            <ul>
                <li>
                    <strong>Client:</strong> {portfolio.client}
                </li>

                <li>
                    <strong>Category:</strong> {portfolio.category}
                </li>

                <li>
                    <strong>Date:</strong> {portfolio.date}
                </li>
            </ul>

            <p>{portfolio.content}</p>
        </section>
    );
};

export default PortfolioDetails;