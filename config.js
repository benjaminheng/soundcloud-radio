const config = {
    isProduction: process.env.NODE_ENV === 'production',
    port: process.env.PORT,
    apiKey: process.env.API_KEY,
    presets: {
        electronic: {
            title: 'SoundCloud Radio (Electronic)',
            genres: ['electronic'],
            tags: []
        },
        chillstep: {
            title: 'SoundCloud Radio (Chillstep)',
            genres: ['chillstep'],
            tags: []
        }
    }
}

export default config;

