// import React from 'react';
// import { ArrowRight,ArrowDown, Database, BarChart2, TrendingUp, FileSearch, Eye, Settings, Scale, ShieldCheck, CircleDollarSign, Clock, Target, LogIn } from 'lucide-react';
// import { Link } from 'react-router-dom';

// const Home = () => {
//   return (
//     <main
//       className="animate-fade-in"
//       style={{ background: "white", paddingBottom: "0" }}
//     >
//       {/* 1. Main Hero Section */}
//       <section
//         className="hero-section"
//         style={{
//           minHeight: "65vh",
//           padding: "4rem 1.5rem 4rem",
//           background:
//             "radial-gradient(circle at top right, rgba(16, 185, 129, 0.05) 0%, var(--bg-color) 100%)",
//         }}
//       >
//         <div
//           className="container"
//           style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}
//         >
//           <div
//             className="hero-content"
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               textAlign: "center",
//               maxWidth: "900px",
//               margin: "0 auto",
//             }}
//           >
//             <h1
//               className="hero-title mobile-hero-split"
//               style={{
//                 fontSize: "4rem",
//                 marginBottom: "1.5rem",
//                 lineHeight: "1.1",
//               }}
//             >
//               AI-native carbon intelligence for <span className="mobile-only-block">modern businesses</span>
//             </h1>
//             <p
//               className="hero-subtitle"
//               style={{
//                 fontSize: "1.35rem",
//                 marginBottom: "3rem",
//                 maxWidth: "900px",
//                 margin: "0 auto 3rem",
//               }}
//             >
//               CarbonTatva AI helps enterprises and SMEs measure, monitor,
//               forecast, and reduce emissions through an AI-powered layer that
//               works on top of existing systems.
//             </p>
//             <div
//               style={{
//                 display: "flex",
//                 gap: "1rem",
//                 justifyContent: "center",
//                 flexWrap: "wrap",
//               }}
//             >
//               <Link
//                 to="/demo"
//                 className="btn btn-primary"
//                 style={{ padding: "1rem 3rem", fontSize: "1.25rem" }}
//               >
//                 <LogIn size={20} style={{ marginRight: "10px" }} />
//                 Book a demo
//               </Link>
//             </div>
//           </div>

//           {/* Visual direction: 4.png Process Flow */}

//           <div className="process-flow-container mobile-scroll-flow">
//             <div className="process-card mobile-process-card">
//               <div className="process-header">Data Sources</div>
//               <div className="process-icon">
//                 <Database size={40} strokeWidth={1.5} />
//               </div>
//               <div className="process-title mobile-process-title">Collect Data</div>
//               <div className="process-desc">
//                 From ERPs, invoices and energy bills.
//               </div>
//             </div>
//             <div className="process-arrow mobile-process-arrow">
//               <span className="desktop-arrow">
//                   <ArrowRight size={24} />
//               </span>
//               <span className="mobile-arrow">
//                   <ArrowDown size={24} />
//               </span>
//             </div>
//             <div className="process-card mobile-process-card">
//               <div className="process-header">Measurements</div>
//               <div className="process-icon">
//                 <BarChart2 size={40} strokeWidth={1.5} />
//               </div>
//               <div className="process-title mobile-process-title">Measure Emissions</div>
//               <div className="process-desc">Scope 1,2,3 tracking</div>
//             </div>
//             <div className="process-arrow mobile-process-arrow">
//             <span className="desktop-arrow">
//                 <ArrowRight size={24} />
//             </span>

//             <span className="mobile-arrow">
//                 <ArrowDown size={24} />
//             </span>
//             </div>
//             <div className="process-card mobile-process-card">
//               <div className="process-header">Forecasting</div>
//               <div className="process-icon">
//                 <TrendingUp size={40} strokeWidth={1.5} />
//               </div>
//               <div className="process-title mobile-process-title">Forecast Impact</div>
//               <div className="process-desc">AI-driven predictions</div>
//             </div>
//             <div className="process-arrow mobile-process-arrow">
//             <span className="desktop-arrow">
//                 <ArrowRight size={24} />
//             </span>

//             <span className="mobile-arrow">
//                 <ArrowDown size={24} />
//             </span>
//             </div>
//             <div className="process-card mobile-process-card">
//               <div className="process-header">Insights</div>
//               <div className="process-icon">
//                 <FileSearch size={40} strokeWidth={1.5} />
//               </div>
//               <div className="process-title mobile-process-title">Actionable Insights</div>
//               <div className="process-desc">Decision-ready intelligence</div>
//             </div>
//           </div>

//           <div
//             className="mobile-strict-line"
//             style={{
//               textAlign: "center",
//               marginTop: "1rem",
//               fontSize: "1.5rem",
//               fontWeight: "500",
//               color: "var(--text-main)",
//             }}
//           >
//             From data to decisions — all in one platform.
//           </div>
//         </div>
//       </section>

//       {/* 2. Problem Section matching 2.png */}
//       <section
//         className="problems-section"
//         style={{ background: "white", padding: "4rem 0" }}
//       >
//         <div className="container" style={{ position: "relative" }}>
//           <div
//             style={{
//               textAlign: "center",
//               maxWidth: "100%",
//               margin: "0 auto 3rem",
//             }}
//           >
//             <h2
//               className="hero-title mobile-strict-line"
//               style={{
//                 fontSize: "3.5rem",
//                 margin: "0 auto 1rem",
//                 maxWidth: "1200px",
//                 color: "var(--text-main)",
//               }}
//             >
//               Carbon management today is broken
//             </h2>
//             <p
//               className="mobile-strict-line"
//               style={{
//                 fontSize: "2.5rem",
//                 fontWeight: "700",
//                 color: "var(--primary-green)",
//                 marginBottom: "2rem",
//               }}
//             >
//               Manual • Fragmented • Complex
//             </p>
//           </div>

//           <div className="feature-grid mobile-2x2-grid">
//             <div className="feature-card mobile-inline-card">
//               <Database size={48} strokeWidth={1.5} className="feature-icon mobile-feature-icon" />
//               <h3 className="feature-title">Fragmented Data</h3>
//               <p className="feature-desc mobile-feature-desc">
//                 Data spread across ERPs, bills, spreadsheets.
//               </p>
//             </div>
//             <div className="feature-card mobile-inline-card">
//               <Settings size={48} strokeWidth={1.5} className="feature-icon mobile-feature-icon" />
//               <h3 className="feature-title">Manual Processes</h3>
//               <p className="feature-desc mobile-feature-desc">
//                 Time-consuming carbon tracking & reporting.
//               </p>
//             </div>
//             <div className="feature-card mobile-inline-card">
//               <Eye size={48} strokeWidth={1.5} className="feature-icon mobile-feature-icon" />
//               <h3 className="feature-title">Lack of Visibility</h3>
//               <p className="feature-desc mobile-feature-desc">
//                 No real time insights for decision making.
//               </p>
//             </div>
//             <div className="feature-card mobile-inline-card">
//               <Scale size={48} strokeWidth={1.5} className="feature-icon mobile-feature-icon" />
//               <h3 className="feature-title">Regulatory Pressure</h3>
//               <p className="feature-desc mobile-feature-desc">
//                 Time-consuming carbon tracking & reporting.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* 3. Benefits Section matching 5.png */}
//       <section
//         className="benefits-section"
//         style={{ background: "white", padding: "4rem 0", position: "relative" }}
//       >
//         <div className="container">
//           <div
//             style={{
//               textAlign: "center",
//               maxWidth: "100%",
//               margin: "0 auto 3rem",
//             }}
//           >
//             <h2
//               className="hero-title mobile-strict-line"
//               style={{
//                 fontSize: "3.5rem",
//                 margin: "0 auto 1rem",
//                 maxWidth: "1200px",
//                 color: "var(--text-main)",
//               }}
//             >
//               But it doesn't have to be
//             </h2>

//             <p
//               className="hero-subtitle"
//               style={{
//                 fontSize: "1.25rem",
//                 color: "var(--text-muted)",
//                 maxWidth: "1000px",
//                 margin: "0 auto",
//                 lineHeight: "1.8",
//               }}
//             >
//               CarbonTatva AI is an AI-native climate intelligence layer that
//               sits on top of your existing systems and turns operational data
//               into actionable insights. It helps businesses automate data
//               integration, accurately calculate emissions, forecast future
//               impacts, and identify reduction opportunities.
//             </p>
//             <p
//               className="mobile-strict-line"
//               style={{
//                 fontSize: "2.5rem",
//                 fontWeight: "700",
//                 color: "var(--primary-green)",
//                 marginBottom: "2rem",
//                 paddingTop: "15px"
//               }}
//             >
//               Real impact, Measurable outcomes.
//             </p>
//           </div>

//           <div className="feature-grid mobile-2x2-grid" style={{ marginBottom: "5rem" }}>
//             <div className="feature-card mobile-inline-card">
//               <ShieldCheck
//                 size={48}
//                 strokeWidth={1.5}
//                 className="feature-icon mobile-feature-icon"
//               />
//               <h3 className="feature-title">Reduce Compliance Complexity</h3>
//               <p className="feature-desc mobile-feature-desc">
//                 Simplify CBAM & regulatory reporting
//               </p>
//             </div>
//             <div className="feature-card mobile-inline-card">
//               <CircleDollarSign
//                 size={48}
//                 strokeWidth={1.5}
//                 className="feature-icon mobile-feature-icon"
//               />
//               <h3 className="feature-title">Optimize costs</h3>
//               <p className="feature-desc mobile-feature-desc">
//                 Identify inefficiencies and reduce emissions-related costs.
//               </p>
//             </div>
//             <div className="feature-card mobile-inline-card">
//               <Clock size={48} strokeWidth={1.5} className="feature-icon mobile-feature-icon" />
//               <h3 className="feature-title">Faster Decisions</h3>
//               <p className="feature-desc mobile-feature-desc">
//                 Real time insights for better business decisions
//               </p>
//             </div>
//             <div className="feature-card mobile-inline-card">
//               <Target size={48} strokeWidth={1.5} className="feature-icon mobile-feature-icon" />
//               <h3 className="feature-title">Accelerate Net-Zero Goals</h3>
//               <p className="feature-desc mobile-feature-desc">
//                 Structured path towards sustainability targets
//               </p>
//             </div>
//           </div>

//           {/* <div
//             style={{
//               textAlign: "center",
//               fontSize: "1.5rem",
//               fontWeight: "500",
//               color: "var(--text-main)",
//             }}
//           >
//             Make decisions 3x faster with real-time{" "}
//             <span style={{ color: "var(--primary-green)" }}>
//               Carbon Intelligence.
//             </span>
//           </div> */}

//           <div style={{ textAlign: "center", marginTop: "4rem" }}>
//             <Link
//               to="/offerings"
//               className="btn btn-primary"
//               style={{ padding: "1rem 3rem", fontSize: "1.15rem" }}
//             >
//               Explore Features{" "}
//               <ArrowRight size={20} style={{ marginLeft: "10px" }} />
//             </Link>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// };

// export default Home;
