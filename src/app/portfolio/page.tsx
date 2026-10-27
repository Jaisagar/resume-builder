import InnerBanner from "@/src/components/Innerbaner";
import PortfolioCard from "@/src/components/PortfolioCard";

async function getPortfolio() {
  const res = await fetch(
    "http://localhost:8000/portfolio",
    {
      cache: "no-store",
    }
  );

  return res.json();
}

const PortfolioPage = async () => {
  const portfolioItems = await getPortfolio();

  return (
    <>
      <InnerBanner />
      <section className="space">
        <div className="container">
          <div className="row">
            {portfolioItems.map((item: any) => (
              <div
                key={item.id}
                className="col-lg-4 col-md-6 mb-4"
              >
                <PortfolioCard portfolio={item} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default PortfolioPage;