/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript : {
    ignoreBuildErros: true,
  },
  reactStrictMode: true,
  images:{
    domains: ['blog.thecodingday.com', 'lh3.googleusercontent.com']
  }
}

module.exports = nextConfig
