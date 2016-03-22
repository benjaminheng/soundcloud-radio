const config = {
    isProduction: process.env.NODE_ENV === 'production',
    port: process.env.PORT,
    apiKey: process.env.API_KEY,
    hostname: 'localhost:3000',
    presets: {
        custom: {
            title: '',
            genres: '',
            tags: ''
        },
        electronic: {
            title: 'SoundCloud Radio (Electronic)',
            genres: 'electronic, house',
            tags: ''
        },
        chillstep: {
            title: 'SoundCloud Radio (Chillstep)',
            genres: 'chillstep',
            tags: ''
        }
    }
}

export default config;

