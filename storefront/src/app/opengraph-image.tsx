import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Sales Autonomy'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#050505',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{
          position: 'absolute',
          top: '-200px',
          left: '200px',
          width: '800px',
          height: '800px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(5,5,5,0) 70%)',
          borderRadius: '50%',
        }} />
        
        <div style={{ 
          fontSize: '84px', 
          color: 'white', 
          letterSpacing: '-0.02em',
          marginBottom: '24px'
        }}>
          sales autonomy
        </div>
        <div style={{ 
          fontSize: '28px', 
          color: 'rgba(255, 255, 255, 0.5)', 
          letterSpacing: '0.05em',
        }}>
          TRAINED SALES OPERATORS. PLACED IN 30 DAYS.
        </div>
      </div>
    ),
    { ...size }
  )
}
