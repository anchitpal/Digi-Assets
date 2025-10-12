import React from 'react'
import Layout from '../Layout/Layout'

const About = () => {
  return (
    <Layout>
      <div className="w-screen min-h-screen bg-[radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
        <section className="w-full max-w-full mx-auto py-8 font-sans">
          <h1 className="text-3xl font-bold mb-5 text-indigo-800 text-center">
            About Us
          </h1>

          <p className="text-lg text-gray-200 mb-6 leading-7 text-center max-w-[95vw] mx-auto px-3">
            Welcome to our website! We are passionate about building modern web
            applications that are fast, responsive, and user-friendly. Our
            mission is to deliver high-quality solutions that help users achieve
            their goals efficiently.
          </p>

          {/* Wrapper for all card sections */}
          <div className="bg-[radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] rounded-xl py-8 px-4 mx-auto w-[95vw] flex flex-col items-center gap-10">
            {/* Top Section Cards */}
            <div className="flex flex-wrap justify-center gap-5 w-full">
              <div className="flex-1 min-w-[220px] max-w-[95vw] bg-white/10 backdrop-blur-sm rounded-xl shadow-md p-5 text-center">
                <h2 className="text-indigo-400 text-lg mb-2 font-semibold">
                  Our Vision
                </h2>
                <p className="text-gray-200 text-base">
                  To empower everyone with seamless digital experiences through
                  innovative technology.
                </p>
              </div>

              <div className="flex-1 min-w-[220px] max-w-[95vw] bg-white/10 backdrop-blur-sm rounded-xl shadow-md p-5 text-center">
                <h2 className="text-indigo-400 text-lg mb-2 font-semibold">
                  Our Values
                </h2>
                <p className="text-gray-200 text-base">
                  Integrity, creativity, and dedication drive everything we do.
                </p>
              </div>

              <div className="flex-1 min-w-[220px] max-w-[95vw] bg-white/10 backdrop-blur-sm rounded-xl shadow-md p-5 text-center">
                <h2 className="text-indigo-400 text-lg mb-2 font-semibold">
                  Contact Us
                </h2>
                <p className="text-gray-200 text-base">
                  Have questions? Reach out at{' '}
                  <a
                    href="mailto:info@example.com"
                    className="text-indigo-300 underline"
                  >
                    info@example.com
                  </a>
                </p>
              </div>
            </div>

            {/* Additional Section Cards */}
            <div className="flex flex-col flex-wrap justify-center items-center gap-5 w-full">
              <div className="flex-1 min-w-[220px] max-w-[95vw] bg-white/10 backdrop-blur-sm rounded-xl shadow-md p-5 text-center">
                <h2 className="text-indigo-300 text-base font-semibold mb-2">
                  Our Team
                </h2>
                <p className="text-gray-200 text-sm">
                  We are a diverse group of developers, designers, and
                  strategists committed to excellence and innovation.
                </p>
              </div>

              <div className="flex-1 min-w-[220px] max-w-[95vw] bg-white/10 backdrop-blur-sm rounded-xl shadow-md p-5 text-center">
                <h2 className="text-indigo-300 text-base font-semibold mb-2">
                  Technologies We Use
                </h2>
                <p className="text-gray-200 text-sm">
                  React, Node.js, Express, MongoDB, and more. We stay up-to-date
                  with the latest tools to deliver the best results.
                </p>
              </div>

              <div className="flex-1 min-w-[220px] max-w-[95vw] bg-white/10 backdrop-blur-sm rounded-xl shadow-md p-5 text-center">
                <h2 className="text-indigo-300 text-base font-semibold mb-2">
                  Careers
                </h2>
                <p className="text-gray-200 text-sm">
                  Interested in joining us?{' '}
                  <a
                    href="mailto:careers@example.com"
                    className="text-indigo-400 underline"
                  >
                    Send your resume
                  </a>{' '}
                  and let's build the future together!
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default About
