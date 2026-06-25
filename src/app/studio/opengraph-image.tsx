import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'README Studio — Build in the Studio';
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
          background: 'linear-gradient(135deg, #07080a 0%, #0d0f14 50%, #07080a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Grid pattern overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(#1f2229 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            opacity: 0.3,
            display: 'flex',
          }}
        />

        {/* Glow blobs */}
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '30%',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'rgba(59, 130, 246, 0.08)',
            filter: 'blur(80px)',
            display: 'flex',
          }}
        />

        {/* Logo icon */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#121212',
            borderRadius: '28px',
            width: '140px',
            height: '140px',
            marginBottom: '36px',
            border: '1.5px solid rgba(255,255,255,0.07)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="72"
            height="72"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#f4f4f6"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            <path d="M10 9H8" />
            <path d="M16 13H8" />
            <path d="M16 17H8" />
          </svg>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 72,
            fontFamily: 'sans-serif',
            color: '#ffffff',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            lineHeight: 1.1,
          }}
        >
          README Studio
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 36,
            color: '#6b7280',
            marginTop: '18px',
            fontWeight: 400,
            letterSpacing: '-0.01em',
          }}
        >
          Visual drag-and-drop README builder
        </div>

        {/* Bottom pill badges */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            marginTop: '48px',
          }}
        >
          {['Block Editor', 'Templates', 'GitHub Export', 'AI Import'].map((label) => (
            <div
              key={label}
              style={{
                backgroundColor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '8px',
                padding: '8px 20px',
                fontSize: 22,
                color: '#9ca3af',
                fontFamily: 'sans-serif',
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
