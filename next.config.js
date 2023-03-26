module.exports = {
    images: {
        dangerouslyAllowSVG: true,
        contentSecurityPolicy:
            "default-src 'self'; script-src 'none'; sandbox;",
        domains: ["dkgqaqbyzemllerimgav.supabase.co"],
    },
    typescript: { ignoreBuildErrors: true },
    experimental: { appDir: true, typedRoutes: true },
};
