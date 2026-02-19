import { ImageResponse } from 'next/og';
import { config } from '@/lib/config';
import { getCompaniesByCity, getCompanyBySlug, getCities } from '@/lib/data';

export const runtime = 'nodejs';

const theme = config.theme;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;

  let title: string = config.name;
  let subtitle: string = config.tagline;
  let detail = '';

  if (slug.length === 2) {
    // City page: /og/texas/austin
    const [state, city] = slug;
    const companies = getCompaniesByCity(state, city);
    if (companies.length) {
      title = `${config.industry.plural} in ${companies[0].city}, ${companies[0].state}`;
      subtitle = `Compare ${companies.length} local ${companies.length === 1 ? config.industry.companyNoun : config.industry.companyNounPlural}`;
      detail = config.name;
    }
  } else if (slug.length === 1 && slug[0] === 'home') {
    // Homepage: /og/home
    title = config.name;
    subtitle = config.tagline;
    const cities = getCities();
    detail = `${cities.length} cities • ${cities.reduce((a, c) => a + c.count, 0)}+ providers`;
  } else if (slug.length === 1) {
    // Company page: /og/company-slug
    const company = getCompanyBySlug(slug[0]);
    if (company) {
      title = company.name;
      subtitle = `${config.industry.singular} in ${company.city}, ${company.state}`;
      detail = config.name;
    }
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '60px 80px',
          background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryDark} 100%)`,
          color: 'white',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {detail && (
            <div
              style={{
                fontSize: 24,
                color: theme.accent,
                fontWeight: 600,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              {detail}
            </div>
          )}
          <div
            style={{
              fontSize: 56,
              fontWeight: 800,
              lineHeight: 1.1,
              maxWidth: '900px',
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 28,
              color: 'rgba(255,255,255,0.75)',
              maxWidth: '800px',
            }}
          >
            {subtitle}
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            right: 80,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              background: theme.accent,
            }}
          />
          <div style={{ fontSize: 22, fontWeight: 700 }}>
            {config.domain}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
