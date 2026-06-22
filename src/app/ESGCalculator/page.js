import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, CartesianGrid } from 'recharts';
import { Plus, Trash2, Calculator, Lock, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

import esgData from '../data/esg_raw_dump.json';

const EMISSION_FACTORS = esgData.map(row => {
  const activity = row['Activity'];
  const category = row['Category / Type'] || activity;
  const factor = row['Emission Factor'];
  const scope = row['Scope'];

  let unit = row['Unit'] || '';
  if (unit.includes('/')) {
    unit = unit.split('/')[1].trim();
  }

  return { activity, category, factor, unit, scope };
});

// Diverse, readable color palette for charts
const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#14b8a6', '#f97316', '#6366f1'];
const BAR_COLORS = { 'Scope 1': '#3b82f6', 'Scope 2': '#10b981', 'Scope 3': '#f59e0b' };

const ESGCalculator = () => {
  const [entries, setEntries] = useState([]);
  const [activity, setActivity] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [category, setCategory] = useState('');
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [factorSource, setFactorSource] = useState('');
  const [isSourceDropdownOpen, setIsSourceDropdownOpen] = useState(false);
  const factorSources = ['IEA', 'IPCC', 'GHG', 'MoEFCC'];
  const [quantity, setQuantity] = useState('');

  const activities = [...new Set(EMISSION_FACTORS.map(f => f.activity))];
  const scope1Activity = EMISSION_FACTORS.find(f => f.scope === 1)?.activity;
  const scope2Activity = EMISSION_FACTORS.find(f => f.scope === 2)?.activity;
  const scope3Activity = EMISSION_FACTORS.find(f => f.scope === 3)?.activity;
  const freeActivities = [...new Set([scope1Activity, scope2Activity, scope3Activity].filter(Boolean))];
  const premiumActivities = activities.filter(a => !freeActivities.includes(a));

  const availableCategories = EMISSION_FACTORS.filter(f => f.activity === activity);

  const currentFactor = EMISSION_FACTORS.find(f => f.activity === activity && f.category === category);
  const unitHint = currentFactor ? `in ${currentFactor.unit}` : '';

  const handleAddEntry = (e) => {
    e.preventDefault();
    if (!activity || !category || !quantity || isNaN(quantity) || quantity <= 0) return;

    const emission = parseFloat(quantity) * currentFactor.factor;

    const newEntry = {
      id: Date.now(),
      activity,
      category,
      quantity: parseFloat(quantity),
      unit: currentFactor.unit,
      emission,
      scope: currentFactor.scope,
      factor: currentFactor.factor,
      source: factorSource
    };

    setEntries([...entries, newEntry]);

    setActivity('');
    setCategory('');
    setFactorSource('');
    setQuantity('');
  };

  const removeEntry = (id) => {
    setEntries(entries.filter(e => e.id !== id));
  };

  const totalEmissions = entries.reduce((sum, e) => sum + e.emission, 0);
  const scope1Total = entries.filter(e => e.scope === 1).reduce((sum, e) => sum + e.emission, 0);
  const scope2Total = entries.filter(e => e.scope === 2).reduce((sum, e) => sum + e.emission, 0);
  const scope3Total = entries.filter(e => e.scope === 3).reduce((sum, e) => sum + e.emission, 0);

  const barData = [
    { name: 'Scope 1', value: parseFloat(scope1Total.toFixed(2)), fill: BAR_COLORS['Scope 1'] },
    { name: 'Scope 2', value: parseFloat(scope2Total.toFixed(2)), fill: BAR_COLORS['Scope 2'] },
    { name: 'Scope 3', value: parseFloat(scope3Total.toFixed(2)), fill: BAR_COLORS['Scope 3'] },
  ];

  const categoryTotals = {};
  entries.forEach(e => {
    categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.emission;
  });

  const pieData = Object.keys(categoryTotals).map(k => ({
    name: k,
    value: parseFloat(categoryTotals[k].toFixed(2))
  }));

  const MetricCard = ({ title, value, unit, highlight = false }) => (
    <div style={{
      background: highlight ? 'var(--primary-green)' : 'white',
      color: highlight ? 'white' : 'var(--text-main)',
      padding: '1.5rem',
      borderRadius: '16px',
      boxShadow: 'var(--shadow-sm)',
      border: highlight ? 'none' : '1px solid var(--border-light)',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    }}>
      <div style={{ fontSize: '1rem', fontWeight: '500', color: highlight ? 'rgba(255,255,255,0.9)' : 'var(--text-muted)' }}>
        {title}
      </div>
      <div style={{ fontSize: '2rem', fontWeight: '800' }}>
        {value.toLocaleString(undefined, { maximumFractionDigits: 2 })}
      </div>
      <div style={{ fontSize: '0.85rem', color: highlight ? 'rgba(255,255,255,0.8)' : 'var(--text-muted)' }}>
        {unit}
      </div>
    </div>
  );

  return (
    <main className="animate-fade-in" style={{ background: 'var(--bg-secondary)', minHeight: 'calc(100vh - 80px)', paddingBottom: '6rem' }}>
      <div className="container" style={{ paddingTop: '4rem', maxWidth: '1400px' }}>

        <div style={{ textAlign: 'center', marginBottom: '4rem', maxWidth: '800px', margin: '0 auto 4rem' }}>
          <div className="hero-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', margin: '0 auto 1.5rem' }}>
            <Calculator size={16} /> ESG Intelligence
          </div>
          <h1 className="hero-title" style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>
            Interactive <span>ESG Calculator</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', lineHeight: '1.6' }}>
            Instantly map your operational activity against scientifically validated conversion factors to visualize your Scope 1, 2, and 3 footprint in real time.
          </p>
        </div>

        {/* Subscribe Banner */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
          <Link to="/demo" className="btn" style={{ padding: '0.875rem 2.5rem', fontSize: '1.05rem', display: 'flex', gap: '8px', alignItems: 'center', background: 'var(--text-main)', color: 'white', borderRadius: '999px', boxShadow: 'var(--shadow-md)' }}>
            <Lock size={18} /> Subscribe to access the full set of ESG factors
          </Link>
        </div>

        {/* Input Form Section */}`
        <div style={{ background: 'white', padding: '2rem', borderRadius: '24px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-light)', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', margin: 0 }}>Add Emission Entry</h3>
          </div>

          <form onSubmit={handleAddEntry} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', alignItems: 'end' }}>
            <div>
              <label className="form-label" style={{ marginBottom: '0.4rem', fontSize: '0.9rem' }}>Activity Group</label>
              <div
                style={{ position: 'relative' }}
                tabIndex={0}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget)) setIsDropdownOpen(false);
                }}
              >
                <div
                  className="form-input"
                  style={{ padding: '0.875rem 1rem', height: '52px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white' }}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span style={{ color: activity ? 'inherit' : '#9ca3af', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {activity || 'Select Activity'}
                  </span>
                  <ChevronDown size={16} style={{ color: '#9ca3af', minWidth: '16px' }} />
                </div>

                {isDropdownOpen && (
                  <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'white', border: '1px solid var(--border-light)', borderRadius: '12px', marginTop: '4px', zIndex: 50, boxShadow: 'var(--shadow-md)', maxHeight: '350px', overflowY: 'auto', overflowX: 'hidden' }}>
                    {[...freeActivities, ...premiumActivities].map(act => {
                      const isPremium = premiumActivities.includes(act);
                      return (
                        <div
                          key={act}
                          style={{
                            padding: '0.875rem 1rem',
                            cursor: isPremium ? 'not-allowed' : 'pointer',
                            borderBottom: '1px solid var(--border-light)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            opacity: isPremium ? 0.6 : 1,
                            background: isPremium ? 'var(--bg-secondary)' : 'white'
                          }}
                          onClick={() => {
                            if (!isPremium) {
                              setActivity(act); setCategory(''); setIsDropdownOpen(false);
                            }
                          }}
                          onMouseEnter={(e) => { if (!isPremium) e.target.style.background = 'var(--bg-secondary)' }}
                          onMouseLeave={(e) => { if (!isPremium) e.target.style.background = 'white' }}
                        >
                          <span style={{ paddingRight: '8px' }}>{act}</span>
                          {isPremium && <Lock size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="form-label" style={{ marginBottom: '0.4rem', fontSize: '0.9rem' }}>Emission Category</label>
              <div
                style={{ position: 'relative', opacity: !activity ? 0.6 : 1, pointerEvents: !activity ? 'none' : 'auto' }}
                tabIndex={0}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget)) setIsCategoryDropdownOpen(false);
                }}
              >
                <div
                  className="form-input"
                  style={{ padding: '0.875rem 1rem', height: '52px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white' }}
                  onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                >
                  <span style={{ color: category ? 'inherit' : '#9ca3af', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {category || 'Select Category'}
                  </span>
                  <ChevronDown size={16} style={{ color: '#9ca3af', minWidth: '16px' }} />
                </div>

                {isCategoryDropdownOpen && availableCategories.length > 0 && (
                  <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'white', border: '1px solid var(--border-light)', borderRadius: '12px', marginTop: '4px', zIndex: 50, boxShadow: 'var(--shadow-md)', maxHeight: '350px', overflowY: 'auto', overflowX: 'hidden' }}>
                    {availableCategories.map(cat => (
                      <div
                        key={cat.category}
                        style={{ padding: '0.875rem 1rem', cursor: 'pointer', borderBottom: '1px solid var(--border-light)' }}
                        onClick={() => { setCategory(cat.category); setIsCategoryDropdownOpen(false); }}
                        onMouseEnter={(e) => e.target.style.background = 'var(--bg-secondary)'}
                        onMouseLeave={(e) => e.target.style.background = 'white'}
                      >
                        {cat.category}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="form-label" style={{ marginBottom: '0.4rem', fontSize: '0.9rem' }}>Factor Source</label>
              <div
                style={{ position: 'relative', opacity: !category ? 0.6 : 1, pointerEvents: !category ? 'none' : 'auto' }}
                tabIndex={0}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget)) setIsSourceDropdownOpen(false);
                }}
              >
                <div
                  className="form-input"
                  style={{ padding: '0.875rem 1rem', height: '52px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white' }}
                  onClick={() => setIsSourceDropdownOpen(!isSourceDropdownOpen)}
                >
                  <span style={{ color: factorSource ? 'inherit' : '#9ca3af', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {factorSource || 'Select Source'}
                  </span>
                  <ChevronDown size={16} style={{ color: '#9ca3af', minWidth: '16px' }} />
                </div>

                {isSourceDropdownOpen && (
                  <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'white', border: '1px solid var(--border-light)', borderRadius: '12px', marginTop: '4px', zIndex: 50, boxShadow: 'var(--shadow-md)', maxHeight: '350px', overflowY: 'auto', overflowX: 'hidden' }}>
                    {factorSources.map(src => {
                      const isPremium = src !== 'IEA';
                      return (
                        <div
                          key={src}
                          style={{
                            padding: '0.875rem 1rem',
                            cursor: isPremium ? 'not-allowed' : 'pointer',
                            borderBottom: '1px solid var(--border-light)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            opacity: isPremium ? 0.6 : 1,
                            background: isPremium ? 'var(--bg-secondary)' : 'white'
                          }}
                          onClick={() => {
                            if (!isPremium) {
                              setFactorSource(src); setIsSourceDropdownOpen(false);
                            }
                          }}
                          onMouseEnter={(e) => { if (!isPremium) e.target.style.background = 'var(--bg-secondary)' }}
                          onMouseLeave={(e) => { if (!isPremium) e.target.style.background = 'white' }}
                        >
                          <span style={{ paddingRight: '8px' }}>{src}</span>
                          {isPremium && <Lock size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="form-label" style={{ marginBottom: '0.4rem', fontSize: '0.9rem' }}>
                Quantity {unitHint && <span style={{ color: 'var(--primary-green)', fontWeight: '600' }}>({unitHint})</span>}
              </label>
              <input
                type="number"
                step="any"
                min="0"
                className="form-input"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                disabled={!factorSource}
                placeholder="E.g. 1000"
                style={{ padding: '0.875rem 1rem', height: '52px' }}
              />
            </div>

            <div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  padding: '0.875rem',
                  display: 'flex',
                  gap: '8px',
                  justifyContent: 'center',
                  height: '52px',
                  width: '100%'
                }}
              >
                <Plus size={20} /> Add Entry
              </button>
            </div>
          </form>
        </div>

        {/* Top Summary Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          <MetricCard title="Total Emissions" value={totalEmissions} unit="kg CO2e" highlight={true} />
          <MetricCard title="Scope 1 Emissions" value={scope1Total} unit="kg CO2e" />
          <MetricCard title="Scope 2 Emissions" value={scope2Total} unit="kg CO2e" />
          <MetricCard title="Scope 3 Emissions" value={scope3Total} unit="kg CO2e" />
        </div>

        {/* Side-by-Side Charts Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2.5rem', marginBottom: '3rem' }}>

          <div style={{ background: 'white', padding: '2rem', borderRadius: '24px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-light)' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '2rem', color: 'var(--text-main)', textAlign: 'center' }}>Emissions by Scope (kg CO2e)</h3>
            {totalEmissions > 0 ? (
              <div style={{ width: '100%', height: 350 }}>
                <ResponsiveContainer>
                  <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-light)" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: 'var(--text-muted)' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: 'var(--text-muted)' }} />
                    <Tooltip cursor={{ fill: 'var(--bg-secondary)' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-md)' }} />
                    <Bar dataKey="value" name="kg CO2e" radius={[6, 6, 0, 0]} maxBarSize={60}>
                      {barData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div style={{ height: 350, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                No data to visualize. Add entries first!
              </div>
            )}
          </div>

          <div style={{ background: 'white', padding: '2rem', borderRadius: '24px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-light)' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '2rem', color: 'var(--text-main)', textAlign: 'center' }}>Emissions Breakdown</h3>
            {totalEmissions > 0 ? (
              <div style={{ width: '100%', height: 350 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="45%"
                      innerRadius={80}
                      outerRadius={120}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-md)' }} formatter={(value) => `${value} kg`} />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '0.9rem' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div style={{ height: 350, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                No data to visualize. Add entries first!
              </div>
            )}
          </div>

        </div>

        {/* Full-width Logged Entries Table */}
        {entries.length > 0 && (
          <div style={{ background: 'white', padding: '2rem', borderRadius: '24px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-light)' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--text-main)' }}>Activity Log</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-light)', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                    <th style={{ padding: '1rem' }}>Activity Group</th>
                    <th style={{ padding: '1rem' }}>Emission Category</th>
                    <th style={{ padding: '1rem' }}>Quantity</th>
                    <th style={{ padding: '1rem' }}>Source</th>
                    <th style={{ padding: '1rem' }}>Emission Factor</th>
                    <th style={{ padding: '1rem' }}>Scope</th>
                    <th style={{ padding: '1rem' }}>Total Emission</th>
                    <th style={{ padding: '1rem', textAlign: 'center' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.slice().reverse().map((entry, index) => (
                    <tr key={entry.id} style={{ borderBottom: '1px solid var(--border-light)', transition: 'background 0.2s', ':hover': { background: 'var(--bg-secondary)' } }}>
                      <td style={{ padding: '1.25rem 1rem', fontWeight: '500' }}>{entry.activity}</td>
                      <td style={{ padding: '1.25rem 1rem', color: 'var(--text-main)' }}>{entry.category}</td>
                      <td style={{ padding: '1.25rem 1rem' }}>{entry.quantity} <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{entry.unit}</span></td>
                      <td style={{ padding: '1.25rem 1rem' }}>{entry.source}</td>

                      {index === 0 && (
                        <td colSpan={3} rowSpan={entries.length} style={{ position: 'relative', borderLeft: '1px solid var(--border-light)', background: 'var(--bg-secondary)', padding: 0 }}>
                          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.4)', padding: '2rem', textAlign: 'center' }}>
                            <Link to="/demo" style={{ display: 'inline-flex', padding: '0.5rem 1rem', background: 'var(--text-main)', color: 'white', borderRadius: '999px', fontSize: '0.85rem', fontWeight: '500', alignItems: 'center', gap: '6px', transition: 'transform 0.2s', boxShadow: 'var(--shadow-md)' }}>
                              <Lock size={14} /> Subscribe
                            </Link>
                          </div>
                        </td>
                      )}

                      <td style={{ padding: '1.25rem 1rem', textAlign: 'center', verticalAlign: 'top' }}>
                        <button onClick={() => removeEntry(entry.id)} style={{ color: '#ef4444', padding: '0.5rem', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.1)', display: 'inline-flex', alignItems: 'center', transition: 'transform 0.1s' }}>
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </main>
  );
};

export default ESGCalculator;
