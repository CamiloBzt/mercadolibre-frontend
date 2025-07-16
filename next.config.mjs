import million from 'million/compiler';

const nextConfig = {
  // Configuración de imágenes
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'http2.mlstatic.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'mla-s1-p.mlstatic.com',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Configuración de headers para SEO y performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=60, stale-while-revalidate=300',
          },
        ],
      },
    ];
  },

  // Configuración de compresión
  compress: true,

  // Configuración de bundle analyzer (solo en desarrollo)
  ...(process.env.ANALYZE === 'true' && {
    bundleAnalyzer: {
      enabled: true,
    },
  }),

  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },

  // Configuración experimental para mejor performance
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
    webVitalsAttribution: ['CLS', 'LCP'],
    optimizePackageImports: ['million'],
  },

  // Configuración de webpack para optimización
  webpack: (config, { dev }) => {
    // Optimización de SVGs
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    // Optimización de tree shaking
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        usedExports: true,
        sideEffects: false,
      };
    }

    return config;
  },

  // Configuración de TypeScript strict mode
  typescript: {
    ignoreBuildErrors: false,
  },

  // Configuración de ESLint strict mode
  eslint: {
    ignoreDuringBuilds: false,
  },

  // Optimización de output
  output: 'standalone',

  // Configuración de redirects para SEO
  async redirects() {
    return [
      {
        source: '/items/:path*',
        destination: '/productos/:path*',
        permanent: true,
      },
    ];
  },
};

// Exportar configuración con Million.js
export default million.next(nextConfig, {
  auto: {
    threshold: 0.05, // Optimizar componentes que se renderizan frecuentemente
    skip: ['useBadHook', /badVariable/g], // Skipear hooks o variables problemáticas
  },
  // Modo de Million.js
  mode: 'react', // 'react' | 'preact' | 'vdom'
  server: true, // Habilitar optimizaciones del servidor
  rsc: true, // Habilitar soporte para React Server Components
});
