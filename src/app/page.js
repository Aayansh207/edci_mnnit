export default function HomePage() {
  return (
    <main
      style={{
        padding: '3rem 2rem',
        maxWidth: '800px',
        margin: '0 auto',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        lineHeight: 1.6,
      }}
    >
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.25rem', marginBottom: '0.5rem', color: '#111827' }}>
          EDCI MNNIT
        </h1>
        <p style={{ fontSize: '1.125rem', color: '#4b5563' }}>
          Entrepreneurship Development & Innovation Center — MNNIT Allahabad
        </p>
      </header>

      <section
        style={{
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          padding: '1.5rem',
          backgroundColor: '#f9fafb',
          marginBottom: '2rem',
        }}
      >
        <h2 style={{ fontSize: '1.25rem', marginTop: 0, color: '#1f2937' }}>
          Backend & Container Status: Online
        </h2>
        <p style={{ margin: '0.5rem 0', color: '#374151' }}>
          The entire stack (Next.js App Router + PostgreSQL + Prisma 7 ORM) is fully
          containerized and communicating across Docker Compose.
        </p>
        <div style={{ marginTop: '1rem' }}>
          <a
            href="/api/health"
            style={{
              display: 'inline-block',
              backgroundColor: '#2563eb',
              color: '#ffffff',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: 500,
            }}
          >
            Query /api/health Endpoint &rarr;
          </a>
        </div>
      </section>
    </main>
  );
}

