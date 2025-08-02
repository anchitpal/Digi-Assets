import React from 'react'
import Layout from '../Layout/Layout'

const About = () => {
  return (
    <>
      <Layout>
        <div
          style={{
            width: '100vw',
            minHeight: '100vh',
            margin: 0,
            padding: 0,
            background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
          }}
        >
          <section
            style={{
              width: '100%',
              maxWidth: '100vw',
              margin: '0 auto',
              padding: '32px 0',
              borderRadius: '0',
              boxShadow: 'none',
              fontFamily: 'Segoe UI, Arial, sans-serif',
            }}
          >
            <h1
              style={{
                fontSize: '2.2rem',
                fontWeight: '700',
                marginBottom: '20px',
                color: '#3730a3',
                textAlign: 'center',
              }}
            >
              About Us
            </h1>
            <p
              style={{
                fontSize: '1.1rem',
                color: '#374151',
                marginBottom: '24px',
                lineHeight: '1.7',
                textAlign: 'center',
                maxWidth: '95vw',
                marginLeft: 'auto',
                marginRight: 'auto',
                padding: '0 12px',
              }}
            >
              Welcome to our website! We are passionate about building modern web applications that are fast, responsive, and user-friendly. Our mission is to deliver high-quality solutions that help users achieve their goals efficiently.
            </p>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px',
                justifyContent: 'center',
                marginBottom: '32px',
              }}
            >
              <div
                style={{
                  flex: '1 1 220px',
                  background: '#fff',
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(60,72,88,0.06)',
                  padding: '20px',
                  minWidth: '180px',
                  maxWidth: '95vw',
                  textAlign: 'center',
                }}
              >
                <h2 style={{ color: '#6366f1', fontSize: '1.15rem', marginBottom: '10px' }}>Our Vision</h2>
                <p style={{ color: '#4b5563', fontSize: '0.98rem' }}>
                  To empower everyone with seamless digital experiences through innovative technology.
                </p>
              </div>
              <div
                style={{
                  flex: '1 1 220px',
                  background: '#fff',
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(60,72,88,0.06)',
                  padding: '20px',
                  minWidth: '180px',
                  maxWidth: '95vw',
                  textAlign: 'center',
                }}
              >
                <h2 style={{ color: '#6366f1', fontSize: '1.15rem', marginBottom: '10px' }}>Our Values</h2>
                <p style={{ color: '#4b5563', fontSize: '0.98rem' }}>
                  Integrity, creativity, and dedication drive everything we do.
                </p>
              </div>
              <div
                style={{
                  flex: '1 1 220px',
                  background: '#fff',
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(60,72,88,0.06)',
                  padding: '20px',
                  minWidth: '180px',
                  maxWidth: '95vw',
                  textAlign: 'center',
                }}
              >
                <h2 style={{ color: '#6366f1', fontSize: '1.15rem', marginBottom: '10px' }}>Contact Us</h2>
                <p style={{ color: '#4b5563', fontSize: '0.98rem' }}>
                  Have questions? Reach out at{' '}
                  <a href="mailto:info@example.com" style={{ color: '#3730a3', textDecoration: 'underline' }}>
                    info@example.com
                  </a>
                </p>
              </div>
            </div>
            {/* Additional Content */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '20px',
                marginTop: '18px',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  flex: '1 1 220px',
                  background: '#f3f4f6',
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(60,72,88,0.04)',
                  padding: '20px',
                  minWidth: '180px',
                  maxWidth: '95vw',
                  textAlign: 'center',
                }}
              >
                <h2 style={{ color: '#3730a3', fontSize: '1.08rem', marginBottom: '8px' }}>Our Team</h2>
                <p style={{ color: '#374151', fontSize: '0.95rem' }}>
                  We are a diverse group of developers, designers, and strategists committed to excellence and innovation.
                </p>
              </div>
              <div
                style={{
                  flex: '1 1 220px',
                  background: '#f3f4f6',
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(60,72,88,0.04)',
                  padding: '20px',
                  minWidth: '180px',
                  maxWidth: '95vw',
                  textAlign: 'center',
                }}
              >
                <h2 style={{ color: '#3730a3', fontSize: '1.08rem', marginBottom: '8px' }}>Technologies We Use</h2>
                <p style={{ color: '#374151', fontSize: '0.95rem' }}>
                  React, Node.js, Express, MongoDB, and more. We stay up-to-date with the latest tools to deliver the best results.
                </p>
              </div>
              <div
                style={{
                  flex: '1 1 220px',
                  background: '#f3f4f6',
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(60,72,88,0.04)',
                  padding: '20px',
                  minWidth: '180px',
                  maxWidth: '95vw',
                  textAlign: 'center',
                }}
              >
                <h2 style={{ color: '#3730a3', fontSize: '1.08rem', marginBottom: '8px' }}>Careers</h2>
                <p style={{ color: '#374151', fontSize: '0.95rem' }}>
                  Interested in joining us?{' '}
                  <a href="mailto:careers@example.com" style={{ color: '#6366f1', textDecoration: 'underline' }}>
                    Send your resume
                  </a>{' '}
                  and let's build the future together!
                </p>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  )

}

export default About
