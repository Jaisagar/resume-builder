import InnerBanner from "@/src/components/Innerbaner";
import PortfolioDetails from "../../../components/PortfolioDetails";
import { notFound } from "next/navigation";

async function getPortfolio(slug: string) {
    const res = await fetch(
        `http://localhost:8000/portfolio?slug=${slug}`,
        {
            cache: "no-store",
        }
    );

    const data = await res.json();

    return data[0];
}

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

const PortfolioDetailsPage = async ({
    params,
}: Props) => {
    const { slug } = await params;

    const portfolio = await getPortfolio(slug);

    if (!portfolio) {
        notFound();
    }

    return (
        <>
            <InnerBanner />
            <div className="container">
                <PortfolioDetails portfolio={portfolio} />
            </div>
        </>
    );
};

export default PortfolioDetailsPage;