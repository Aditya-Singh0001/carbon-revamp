"use client";
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const Blogs = () => {
  const blogs = [
    {
      id: 1,
      title: 'Article Title',
      author: 'Author Name',
      excerpt: 'Article excerpt and summary will appear here once content is available.',
    },
    {
      id: 2,
      title: 'Article Title',
      author: 'Author Name',
      excerpt: 'Article excerpt and summary will appear here once content is available.',
    },
    {
      id: 3,
      title: 'Article Title',
      author: 'Author Name',
      excerpt: 'Article excerpt and summary will appear here once content is available.',
    }
  ];

  return (
    <main
      className="animate-fade-in"
      style={{ background: 'var(--bg-color)', minHeight: 'calc(100vh - 80px)', paddingBottom: '6rem', paddingTop: '80px' }}
    >
      <div className="container" style={{ paddingTop: '4rem' }}>
        
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '5rem', maxWidth: '800px', margin: '0 auto 5rem' }}>
          <h1 className="hero-title" style={{ fontSize: '3.5rem', marginBottom: '1.5rem', color: 'var(--text-main)' }}>
            Blogs & <span style={{ color: 'var(--primary-green)' }}>Articles</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', lineHeight: '1.6' }}>
            Insights, research, and perspectives on carbon intelligence and climate action.
          </p>
        </div>

        {/* Blog Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {blogs.map((blog) => (
            <div 
              key={blog.id} 
              style={{
                background: 'white',
                borderRadius: '24px',
                padding: '1.5rem',
                border: '1px solid var(--border-light)',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                e.currentTarget.style.borderColor = 'var(--primary-green-light)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                e.currentTarget.style.borderColor = 'var(--border-light)';
              }}
            >
              {/* Image Placeholder */}
              <div style={{
                background: '#e5e7eb',
                borderRadius: '16px',
                height: '200px',
                width: '100%'
              }}></div>

              {/* Content Area */}
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ color: 'var(--primary-green)', fontWeight: '600', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>—</span> {blog.author}
                </div>
                
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '1rem' }}>
                  {blog.title}
                </h3>
                
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '1.05rem', marginBottom: '2rem', flex: 1 }}>
                  {blog.excerpt}
                </p>
                
                <div>
                  <Link href="#" className="btn btn-primary" style={{
                    padding: '0.6rem 1.25rem',
                    fontSize: '0.95rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    Read More <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
};

export default Blogs;
