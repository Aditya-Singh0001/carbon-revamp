import React, { useState } from 'react';
import { Database, BarChart2, TrendingUp, Zap, Lightbulb, CheckCircle2 } from 'lucide-react';

const Demo = () => {
  const [selectedInterests, setSelectedInterests] = useState([]);

  const [expandedId, setExpandedId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const offerings = [
    { id: 'tatva.ingest', icon: <Database size={20} />, label: 'tatva.ingest', desc: 'Securely extract and harmonize operational data from disparate sources.' },
    { id: 'tatva.measure', icon: <BarChart2 size={20} />, label: 'tatva.measure', desc: 'Accurately convert activity data into standardized emission metrics.' },
    { id: 'tatva.forecast', icon: <TrendingUp size={20} />, label: 'tatva.forecast', desc: 'Predict future carbon impact using advanced predictive modeling.' },
    { id: 'tatva.gridprice', icon: <Zap size={20} />, label: 'tatva.gridprice', desc: 'Analyze and optimize electricity consumption against market rates.' },
    { id: 'tatva.recommend', icon: <Lightbulb size={20} />, label: 'tatva.recommend', desc: 'Discover actionable AI-driven strategies to lower your footprint.' }
  ];

  const toggleInterest = (id) => {
    if (id === "all") {
      if (selectedInterests.length === offerings.length) {
        // If all already selected → deselect all
        setSelectedInterests([]);
      } else {
        // Select all
        setSelectedInterests(offerings.map((o) => o.id));
      }
      return;
    }

    if (selectedInterests.includes(id)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== id));
    } else {
      setSelectedInterests([...selectedInterests, id]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target);
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/support@carbontatva.com", {
        method: "POST",
        headers: {
            'Accept': 'application/json'
        },
        body: formData
      });
      
      if (!response.ok) {
        throw new Error("FormSubmit activation required or submission denied.");
      }
      
      setShowSuccess(true);
      e.target.reset();
      setSelectedInterests([]);
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
              Demo Requested!
            </h3>
            <p
              style={{
                color: "var(--text-muted)",
                marginBottom: "2rem",
                lineHeight: "1.6",
              }}
            >
              We've received your request. Our team will reach out to schedule
              your demo.
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
        style={{
          background: "var(--bg-secondary)",
          minHeight: "calc(100vh - 80px)",
          display: "flex",
          alignItems: "flex-start",
          paddingTop: "2rem",
          paddingBottom: "2rem",
        }}
      >
        <div
          className="container"
          style={{
            width: "100%",
            maxWidth: "1400px",
            display: "flex",
            flexWrap: "wrap",
            gap: "2rem",
            padding: "0 1.5rem",
          }}
        >
          {/* LEFT VISUAL CONTENT */}
          <div
            style={{
              flex: "1",
              minWidth: "350px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              paddingTop: "0",
            }}
          >
            <h1
              className="hero-title"
              style={{
                fontSize: "3rem",
                marginBottom: "0.5rem",
                textAlign: "left",
                lineHeight: "1.1",
              }}
            >
              Book your <span>demo</span>
            </h1>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "1.05rem",
                marginBottom: "1.5rem",
                maxWidth: "500px",
              }}
            >
              Select the modules you are interested in, and we will tailor the
              walk-through to your specific organizational needs.
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {offerings.map((off) => (
                <div
                  key={off.id}
                  className="demo-offering-card"
                  style={{
                    border: "1px solid var(--border-light)",
                    padding: "0.875rem 1.25rem",
                    background: "white",
                    cursor: "default",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.875rem",
                    }}
                  >
                    <div style={{ color: "var(--primary-green)" }}>
                      {off.icon}
                    </div>
                    <div
                      style={{
                        fontWeight: "600",
                        fontSize: "1.05rem",
                        color: "var(--text-main)",
                      }}
                    >
                      {off.label}
                    </div>
                  </div>
                  <div
                    style={{
                      color: "var(--text-muted)",
                      fontSize: "0.9rem",
                      lineHeight: "1.4",
                      paddingLeft: "2.35rem",
                      marginTop: "0.25rem",
                    }}
                  >
                    {off.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT FORM */}
          <div
            style={{
              flex: "1.5",
              minWidth: "400px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
              onSubmit={handleSubmit}
            >
              <input
                type="hidden"
                name="_subject"
                value="New Demo Request from Website"
              />
              <input type="hidden" name="_captcha" value="false" />
              <input type="text" name="_honey" style={{ display: "none" }} />
              <input
                type="hidden"
                name="selectedInterests"
                value={selectedInterests.join(", ")}
              />

              <div style={{ display: "flex", gap: "1.5rem" }}>
                <div style={{ flex: 1 }}>
                  <label
                    className="form-label"
                    style={{ fontSize: "0.9rem", marginBottom: "0.25rem" }}
                  >
                    First Name
                  </label>
                  <input
                    name="firstName"
                    type="text"
                    required
                    className="form-input"
                    style={{ padding: "0.6rem 1rem" }}
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
                    name="lastName"
                    type="text"
                    required
                    className="form-input"
                    style={{ padding: "0.6rem 1rem" }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: "1.5rem" }}>
                <div style={{ flex: 1 }}>
                  <label
                    className="form-label"
                    style={{ fontSize: "0.9rem", marginBottom: "0.25rem" }}
                  >
                    Work Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="form-input"
                    style={{ padding: "0.6rem 1rem" }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label
                    className="form-label"
                    style={{ fontSize: "0.9rem", marginBottom: "0.25rem" }}
                  >
                    Company Name
                  </label>
                  <input
                    name="company"
                    type="text"
                    className="form-input"
                    style={{ padding: "0.6rem 1rem" }}
                  />
                </div>
              </div>

              <div>
                <label
                  className="form-label"
                  style={{
                    fontSize: "0.95rem",
                    marginBottom: "0.75rem",
                    fontWeight: "600",
                  }}
                >
                  I'm interested in:
                </label>
                <div
                  style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}
                >
                  {/* ALL BUTTON */}
                  <button
                    type="button"
                    onClick={() => toggleInterest("all")}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.5rem 1rem",
                      borderRadius: "99px",
                      fontSize: "0.9rem",
                      fontWeight: "500",
                      border:
                        selectedInterests.length === offerings.length
                          ? "2px solid var(--primary-green)"
                          : "1px solid var(--border-light)",
                      background:
                        selectedInterests.length === offerings.length
                          ? "rgba(16, 185, 129, 0.1)"
                          : "white",
                      color:
                        selectedInterests.length === offerings.length
                          ? "var(--primary-green-dark)"
                          : "var(--text-muted)",
                      transition: "all 0.2s",
                    }}
                  >
                    {selectedInterests.length === offerings.length && (
                      <CheckCircle2 size={16} />
                    )}
                    All
                  </button>
                  {offerings.map((off) => (
                    <button
                      type="button"
                      key={off.id}
                      onClick={() => toggleInterest(off.id)}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        padding: "0.5rem 1rem",
                        borderRadius: "99px",
                        fontSize: "0.9rem",
                        fontWeight: "500",
                        border: selectedInterests.includes(off.id)
                          ? "2px solid var(--primary-green)"
                          : "1px solid var(--border-light)",
                        background: selectedInterests.includes(off.id)
                          ? "rgba(16, 185, 129, 0.1)"
                          : "white",
                        color: selectedInterests.includes(off.id)
                          ? "var(--primary-green-dark)"
                          : "var(--text-muted)",
                        transition: "all 0.2s",
                      }}
                    >
                      {selectedInterests.includes(off.id) && (
                        <CheckCircle2 size={16} />
                      )}
                      {off.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label
                  className="form-label"
                  style={{ fontSize: "0.9rem", marginBottom: "0.25rem" }}
                >
                  Any specific requirements?
                </label>
                <textarea
                  name="message"
                  className="form-textarea"
                  style={{ minHeight: "80px", padding: "0.6rem 1rem" }}
                />
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
                  opacity: isSubmitting ? 0.7 : 1,
                }}
              >
                {isSubmitting ? "Requesting..." : "Request Demo →"}
              </button>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                By submitting this form, you agree to our privacy policy.
              </p>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Demo;
