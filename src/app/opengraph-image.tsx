import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Readme Design — Design beautiful GitHub READMEs, visually.';
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
          position: 'relative',
          background: '#0a0a0a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-220px',
            right: '-120px',
            width: '640px',
            height: '640px',
            background:
              'radial-gradient(circle, rgba(52,211,153,0.16) 0%, rgba(52,211,153,0) 70%)',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div
            style={{
              width: '88px',
              height: '88px',
              borderRadius: '20px',
              backgroundColor: '#f5f5f5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="52"
              height="52"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0a0a0a"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 5h16" />
              <path d="M4 12h10" />
              <path d="M4 19h7" />
            </svg>
          </div>
          <div
            style={{
              fontSize: 46,
              fontFamily: 'sans-serif',
              color: '#ffffff',
              fontWeight: 600,
              letterSpacing: '-0.02em',
            }}
          >
            Readme Design
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 78,
            fontFamily: 'sans-serif',
            color: '#f5f5f5',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            marginTop: '56px',
            maxWidth: '1000px',
          }}
        >
          Design beautiful GitHub READMEs, visually.
        </div>

        <div style={{ display: 'flex', marginTop: '44px' }}>
          <div
            style={{
              display: 'flex',
              backgroundColor: '#34d399',
              color: '#022c22',
              fontSize: 27,
              fontFamily: 'sans-serif',
              fontWeight: 600,
              padding: '12px 26px',
              borderRadius: '999px',
            }}
          >
            Drag-and-drop · AI autofill · One-click push
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
