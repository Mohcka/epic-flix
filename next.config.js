/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "upload.wikimedia.org",
      "commondatastorage.googleapis.com",
      "uhdtv.io",
      "download.blender.org",
      "mango.blender.org",
      "i.ytimg.com",
      "www.blender.org",
    ],
  },
};

module.exports = nextConfig;
