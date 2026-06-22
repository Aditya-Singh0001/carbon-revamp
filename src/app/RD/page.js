import React, { useState } from 'react';
import { ExternalLink, Send, CheckCircle2 } from 'lucide-react';

const RD = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target);
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/support@carbontatva.com", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error("FormSubmit activation required or submission denied.");
      }
      
      setShowSuccess(true);
      e.target.reset();
    } catch (error) {
       console.error(error);
       alert("Error submitting form. Please try again.");
    } finally {
       setIsSubmitting(false);
    }
  };

  return (
    <>
      {showSuccess && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            animation: "fadeIn 0.2s ease-out",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "3rem",
              borderRadius: "24px",
              textAlign: "center",
              maxWidth: "400px",
              width: "90%",
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                background: "rgba(16, 185, 129, 0.1)",
                color: "var(--primary-green)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.5rem",
              }}
            >
              <CheckCircle2 size={32} />
            </div>
            <h3
              style={{
                fontSize: "1.5rem",
                marginBottom: "1rem",
                color: "var(--text-main)",
                fontWeight: "800",
              }}
            >
              Request Sent!
            </h3>
            <p
              style={{
                color: "var(--text-muted)",
                marginBottom: "2rem",
                lineHeight: "1.6",
              }}
            >
              We have successfully received your details. Our team will contact
              you shortly.
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="btn btn-primary"
              style={{ width: "100%", padding: "0.875rem", fontSize: "1.1rem" }}
            >
              Done
            </button>
          </div>
        </div>
      )}
      <main
        className="animate-fade-in"
        style={{ background: "var(--bg-secondary)", paddingBottom: "6rem" }}
      >
        <div className="container" style={{ paddingTop: "4rem" }}>
          {/* Intro Section */}
          <section className="rd-intro" style={{ maxWidth: "1200px" }}>
            <h1
              className="hero-title offering-title"
              style={{
                marginBottom: "1.5rem",
                textAlign: "center",
                margin: "0 auto 1.5rem",
              }}
            >
              Research & <span>Development</span>
            </h1>
            <p
              className="hero-subtitle"
              style={{
                margin: "0 auto 3rem",
                color: "var(--text-muted)",
                fontSize: "1.2rem",
                lineHeight: "1.8",
                maxWidth: "1100px",
                padding: "0 1rem",
              }}
            >
              Our work at CarbonTatva.AI is grounded in rigorous research at the
              intersection of climate, energy, and AI. As founders, we have
              actively contributed to advancing methodologies in energy demand
              forecasting and climate impact analysis. This research underpins
              our product capabilities, enabling us to build accurate, scalable,
              and regulation-ready solutions for real-world emissions
              measurement, forecasting, and decision-making.
            </p>
          </section>

          {/* Papers Section */}
          <section className="papers-grid">
            {/* Paper 1 */}
            <div className="paper-card">
              <h2 className="paper-title">
                Climate Change: Impact of Global Warming on India’s Electricity
                Consumption
              </h2>
              <div className="paper-authors">By Mantavya Upadhyay et al.</div>
              <p className="paper-summary">
                This study analyses how rising temperatures influence
                electricity demand across India, using state-level consumption
                and weather data. It highlights how temperature variations
                significantly impact demand patterns, with big regional and
                socio-economic differences. The findings provide a foundation
                for understanding climate-driven demand shifts, directly
                informing how we model emissions sensitivity and forecast future
                energy needs.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => alert("Paper link coming soon!")}
              >
                Read Paper{" "}
                <ExternalLink size={18} style={{ marginLeft: "8px" }} />
              </button>
            </div>

            {/* Paper 2 */}
            <div className="paper-card">
              <h2 className="paper-title">
                Energy Transition Modelling: Short-Term Electricity Demand
                Forecasting Using Seq2Seq Encoder–Decoder Model
              </h2>
              <div className="paper-authors">By Mantavya Upadhyay et al.</div>
              <p className="paper-summary">
                This paper introduces a Seq2Seq LSTM-based approach for
                short-term electricity demand forecasting that captures complex
                temporal and weather-driven patterns. It demonstrates improved
                forecasting performance compared to conventional methods,
                offering a scalable framework for energy prediction. This work
                informs our AI-native forecasting systems, enabling more
                accurate emissions projections and better planning under dynamic
                operational conditions.
              </p>
              <a
                href="https://link.springer.com/chapter/10.1007/978-981-96-7295-0_10"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Read Paper{" "}
                <ExternalLink size={18} style={{ marginLeft: "8px" }} />
              </a>
            </div>

            {/* Paper 3 */}
            <div className="paper-card">
              <h2 className="paper-title">
                A Smartphone-Based Hybrid Model for Real-Time Monitoring of
                Aggressive Driving Behavior
              </h2>
              <div className="paper-authors">By Mantavya Upadhyay et al.</div>
              <p className="paper-summary">
                This paper highlights the core technical competency of
                CarbonTatva AI by demonstrating our ability to process complex,
                high-frequency sensor data (like telemetry) into actionable
                insights using advanced hybrid modeling. By combining Dynamic
                Time Warping (DTW) for temporal pattern recognition with Random
                Forest for statistical classification, we showcase a
                sophisticated approach to time-series analysis that is directly
                transferable to carbon monitoring. Specifically, this expertise
                allows us to precisely align and analyze fluctuating emission
                patterns across various industrial processes, ensuring that our
                sustainability dashboards provide a high level of accuracy in
                detecting anomalies and forecasting environmental impact as seen
                in driver behavior prediction.
              </p>
              <a
                href="https://ieeexplore.ieee.org/document/11139729"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Read Paper{" "}
                <ExternalLink size={18} style={{ marginLeft: "8px" }} />
              </a>
            </div>
          </section>

          {/* Collaboration Section */}
          <section className="collab-section">
            <div className="collab-content">
              <h2
                style={{
                  fontSize: "2.5rem",
                  color: "var(--text-main)",
                  marginBottom: "1.5rem",
                  fontWeight: "800",
                }}
              >
                Request for <span>collaboration</span>
              </h2>
              <p
                style={{
                  color: "var(--text-muted)",
                  lineHeight: "1.8",
                  fontSize: "1.1rem",
                  marginBottom: "1.5rem",
                }}
              >
                We are always looking to collaborate with academic institutions,
                research labs, and industry partners working at the intersection
                of AI and climate.
              </p>
              <p
                style={{
                  color: "var(--text-muted)",
                  lineHeight: "1.8",
                  fontSize: "1.1rem",
                  marginBottom: "1.5rem",
                }}
              >
                Whether it is joint research, pilot projects, data partnerships,
                or grant initiatives, we aim to build solutions that drive
                real-world impact.
              </p>
              <p
                style={{
                  color: "var(--text-muted)",
                  lineHeight: "1.8",
                  fontSize: "1.1rem",
                }}
              >
                Reach out to us at{" "}
                <a
                  href="mailto:support@carbontatva.com"
                  className="collab-email"
                >
                  support@carbontatva.com
                </a>{" "}
                or fill out the following form to explore collaboration
                opportunities.
              </p>
            </div>

            <div className="collab-form-container">
              <form onSubmit={handleSubmit}>
                <input
                  type="hidden"
                  name="_subject"
                  value="New Collaboration Request from Website"
                />
                <input type="hidden" name="_captcha" value="false" />
                <input type="text" name="_honey" style={{ display: "none" }} />

                <div style={{ display: "flex", gap: "1.5rem" }}>
                  <div style={{ flex: 1 }}>
                    <label
                      className="form-label"
                      style={{ fontSize: "0.9rem", marginBottom: "0.25rem" }}
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      className="form-input"
                      style={{ padding: "0.6rem 1rem" }}
                      placeholder="John"
                      required
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label
                      className="form-label"
                      style={{ fontSize: "0.9rem", marginBottom: "0.25rem" }}
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      className="form-input"
                      style={{ padding: "0.6rem 1rem" }}
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "1.5rem",
                    marginTop: "1.5rem",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <label
                      className="form-label"
                      style={{ fontSize: "0.9rem", marginBottom: "0.25rem" }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-input"
                      style={{ padding: "0.6rem 1rem" }}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label
                      className="form-label"
                      style={{ fontSize: "0.9rem", marginBottom: "0.25rem" }}
                    >
                      Contact No.
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      className="form-input"
                      style={{ padding: "0.6rem 1rem" }}
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>
                </div>

                <div style={{ marginTop: "1.5rem" }}>
                  <label
                    className="form-label"
                    style={{ fontSize: "0.9rem", marginBottom: "0.25rem" }}
                  >
                    Organization Name
                  </label>
                  <input
                    type="text"
                    name="organization"
                    className="form-input"
                    style={{ padding: "0.6rem 1rem" }}
                    placeholder="University or Company"
                    required
                  />
                </div>

                <div style={{ marginTop: "1.5rem" }}>
                  <label
                    className="form-label"
                    style={{ fontSize: "0.9rem", marginBottom: "0.25rem" }}
                  >
                    Message
                  </label>
                  <textarea
                    name="message"
                    className="form-textarea"
                    style={{ minHeight: "80px", padding: "0.6rem 1rem" }}
                    placeholder="How would you like to collaborate?"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                  style={{
                    padding: "0.875rem",
                    fontSize: "1.1rem",
                    width: "100%",
                    maxWidth: "300px",
                    marginTop: "1.5rem",
                    opacity: isSubmitting ? 0.7 : 1,
                  }}
                >
                  {isSubmitting ? (
                    "Submitting..."
                  ) : (
                    <span style={{ display: "flex", alignItems: "center" }}>
                      Submit Request{" "}
                      <Send size={18} style={{ marginLeft: "8px" }} />
                    </span>
                  )}
                </button>
              </form>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default RD;
