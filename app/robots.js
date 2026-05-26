export default function robots() {
  return {
    rules: {
      userAgent: "*",
      disallow: "/intrnl/dev-staging-preview",
    },
    host: "https://www.aisrenext.com",
  };
}
