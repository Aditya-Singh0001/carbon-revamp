import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Database, BarChart2, TrendingUp, Zap, Lightbulb } from 'lucide-react';

const Offerings = () => {
  const offerings = [
    {
      title: 'tatva.ingest',
      icon: <Database size={56} />,
      description: 'tatva.ingest is our AI-native data integration layer that connects with ERP systems, IoT devices, utility data, and manual uploads. It automates data collection, cleaning, and structuring in real time, creating a reliable foundation for emissions tracking while ensuring compliance-readiness with frameworks such as GHG Protocol, CCTS, and CBAM.'
    },
    {
      title: 'tatva.measure',
      icon: <BarChart2 size={56} />,
      description: 'tatva.measure converts operational data into accurate carbon emissions across Scope 1, 2, and 3, aligned with GHG Protocol standards. It applies intelligent emission factors and validation checks to ensure consistency and audit-readiness, enabling businesses to track their carbon footprint in real time while meeting regulatory and reporting requirements.',
      cta: { text: 'Try our ESG Calculator', link: '/esg-calculator' }
    },
    {
      title: 'tatva.forecast',
      icon: <TrendingUp size={56} />,
      description: 'tatva.forecast uses AI-driven models to project future emissions based on historical data, operational trends, and external factors. It supports both short-term operational planning and long-term decarbonisation strategies, helping organisations anticipate risks, plan for compliance, and make informed decisions under evolving regulations like CCTS and CBAM.'
    },
    {
      title: 'tatva.gridprice',
      icon: <Zap size={56} />,
      description: 'tatva.gridprice is an AI-native tool that predicts optimal electricity trading prices across GDAM, DAM, RTM, and other power markets. It leverages demand patterns, weather data, historical prices, and renewable generation trends to deliver real-time price forecasts and bid strategy recommendations. Designed for open access consumers, it enables cost optimisation by helping businesses make smarter, data-driven procurement decisions.'
    },
    {
      title: 'tatva.recommend',
      icon: <Lightbulb size={56} />,
      description: 'tatva.recommend delivers actionable insights to reduce emissions while optimising cost and operational efficiency. Using AI-driven analysis, it identifies high-impact reduction opportunities, prioritises interventions, and aligns them with compliance and sustainability goals, enabling organisations to move from measurement to meaningful climate action.'
    }
  ];

  return (
    <main
      className="animate-fade-in"
      style={{ background: "var(--bg-secondary)", paddingBottom: "6rem" }}
    >
      <div className="container" style={{ paddingTop: "4rem" }}>
        <h1
          className="hero-title offering-title"
          style={{ textAlign: "center", marginBottom: "4rem", margin: "0 auto 4rem" }}
        >
          Our <span>Offerings</span>
        </h1>

        <div className="offerings-list">
          {offerings.map((offering, idx) => (
            <div
              key={idx}
              className={`offering-card ${idx % 2 !== 0 ? "reverse" : ""}`}
            >
              <div className="offering-icon-wrapper">{offering.icon}</div>
              <div className="offering-content">
                <h2 className="offering-title">{offering.title}</h2>
                <p className="offering-desc" style={{ marginBottom: offering.cta ? '1.5rem' : '0' }}>{offering.description}</p>
                {offering.cta && (
                  <Link to={offering.cta.link} className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', display: 'inline-block' }}>
                    {offering.cta.text}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Ready to start Section */}
      <section className="ready-section" style={{ padding: '6rem 0', background: 'transparent' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ flex: '1', minWidth: '300px' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--text-main)', textAlign: 'left' }}>
              Ready to optimize your emissions?
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', lineHeight: '1.6', textAlign: 'left' }}>
              Experience the full power of CarbonTatva AI tailored to your business needs.
            </p>
          </div>
          <div>
            <Link to="/demo" className="btn btn-primary" style={{ padding: "1rem 3rem", fontSize: "1.25rem" }}>
              Book a Demo →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Offerings;
