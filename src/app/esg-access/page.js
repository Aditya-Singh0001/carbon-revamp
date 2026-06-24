"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FileCheck } from 'lucide-react';
import OfferingsPage from '../offerings/page';

export default function ESGAccessPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/grant-esg-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        // Force a hard navigation so the server middleware sees the new cookie
        window.location.href = '/esg-calculator';
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch {
      setError('Connection error. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="animate-fade-in" style={{
      minHeight: '100vh',
      background: 'var(--bg-secondary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: '1.5rem',
    }}>
      <style>{`
        .navbar, footer {
          display: none !important;
        }
      `}</style>

      {/* Blurred background — Offerings page UI */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.8,
        filter: 'blur(8px)',
        pointerEvents: 'none',
        userSelect: 'none',
        overflow: 'hidden'
      }}>
        <div style={{ pointerEvents: 'none' }}>
          <OfferingsPage />
        </div>
      </div>

      {/* Dark overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.62)' }} />

      {/* Gate card */}
      <div style={{
        background: 'white',
        borderRadius: '24px',
        padding: '2.5rem 2.25rem',
        width: '100%',
        maxWidth: '440px',
        boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
        position: 'relative',
        zIndex: 10,
      }}>

        {/* Badge */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(16, 185, 129, 0.12)',
            color: '#059669',
            padding: '5px 14px',
            borderRadius: '999px',
            fontSize: '0.82rem',
            fontWeight: '700',
            border: '1px solid rgba(16, 185, 129, 0.25)',
          }}>
            <FileCheck size={14} /> Free Access
          </span>
        </div>

        <h1 style={{
          textAlign: 'center',
          fontSize: '1.7rem',
          fontWeight: '800',
          color: '#0f172a',
          marginBottom: '0.75rem',
          lineHeight: '1.2',
        }}>
          Unlock the ESG Calculator
        </h1>

        <p style={{
          textAlign: 'center',
          color: '#64748b',
          fontSize: '0.95rem',
          lineHeight: '1.65',
          marginBottom: '2rem',
        }}>
          Enter your work email to get free access to our interactive emissions calculator.
        </p>

        <form onSubmit={handleSubmit}>
          <label style={{
            display: 'block',
            fontWeight: '600',
            color: '#1e293b',
            marginBottom: '0.5rem',
            fontSize: '0.9rem',
          }}>
            Work Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(''); }}
            placeholder="you@company.com"
            required
            style={{
              display: 'block',
              width: '100%',
              padding: '0.875rem 1rem',
              border: `1.5px solid ${error ? '#ef4444' : '#10b981'}`,
              borderRadius: '12px',
              fontSize: '1rem',
              outline: 'none',
              marginBottom: '0.75rem',
              boxSizing: 'border-box',
              color: '#0f172a',
              background: 'white',
            }}
          />

          {error && (
            <p style={{ color: '#ef4444', fontSize: '0.82rem', marginBottom: '0.75rem', margin: '0 0 0.75rem' }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              display: 'block',
              width: '100%',
              padding: '1rem',
              background: loading ? '#6ee7b7' : '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '999px',
              fontSize: '1.05rem',
              fontWeight: '700',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginBottom: '1rem',
              marginTop: '0.25rem',
              letterSpacing: '0.01em',
              transition: 'background 0.2s',
            }}
          >
            {loading ? 'Getting access…' : 'Get Free Access →'}
          </button>

          <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.82rem', margin: 0 }}>
            No spam. Unsubscribe anytime.
          </p>
        </form>
      </div>
    </div>
  );
}
