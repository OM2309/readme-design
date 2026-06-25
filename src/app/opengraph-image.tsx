import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'README Studio';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#07080a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#121212',
            borderRadius: '40px',
            width: '240px',
            height: '240px',
            marginBottom: '40px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.8)',
            border: '2px solid rgba(255,255,255,0.05)',
          }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="120" 
            height="120" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#f4f4f6" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
            <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
            <path d="M10 9H8"/>
            <path d="M16 13H8"/>
            <path d="M16 17H8"/>
          </svg>
        </div>
        <div
          style={{
            fontSize: 80,
            fontFamily: 'sans-serif',
            color: '#ffffff',
            fontWeight: 700,
            letterSpacing: '-0.03em',
          }}
        >
          README Studio
        </div>
        <div
          style={{
            fontSize: 40,
            color: '#a1a1aa',
            marginTop: '20px',
            fontWeight: 400,
          }}
        >
          Design Better READMEs
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
