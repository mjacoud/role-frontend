/* @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'res.cloudinary.com',
      'localhost',
      'www.mis-sp.org.br',
      'example.com',
      'role-files-bucket.s3.us-west-2.amazonaws.com'
    ]
  }
}

module.exports = nextConfig
