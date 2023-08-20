const plugin = require('tailwindcss/plugin')


// Rotate X utilities
const rotateX = plugin(function ({addUtilities}) {
    addUtilities({
        '.rotate-x-20': {
            transform: 'rotateX(20deg)',
        },
        '.rotate-x-40': {
            transform: 'rotateX(40deg)',
        },
        '.rotate-x-60': {
            transform: 'rotateX(60deg)',
        },
        '.rotate-x-80': {
            transform: 'rotateX(80deg)',
        },
        '.rotate-x-180': {
            transform: 'rotateX(180deg)',
        },
        '.rotate-y-180': {
            transform: 'rotateY(180deg)'
        }
    })
})
module.exports = {
    content: [
        "./src/**/*.{vue,js,ts,jsx,tsx,html}"
    ],
    theme: {
        screens: {
            'xs': '280px',
            '2xs': '320px',
            '3xs': '480px',
            'sm': '640px',
            'md': '768px',
            '2md': '900px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1536px',
        },
        extend: {
            objectPosition: {
                'center-top': 'center top',
                'center-center': 'center center'
            },
            fontFamily: {
                sora: ['Sora'],
                sansSerif: ['sans-serif']
            },
            colors: {
                transparent: 'transparent',
                primaryColor: '#1861c5',
                primaryColor_hover: '#2274f5',
                successColor: '#28a745',
                successColor_hover: '#2F9649FF',
                    lightGreenColor: '#81ba00',
                violetColor: '#886cff',
                dangerColor: {
                    default_1: '#de4436',
                    default_2: '#F65D4E',
                    default_3: '#ce3324',
                    hover_2: '#f4402f',

                },
                warningColor: '#ffc021',
                bgWhiteColor: '#f6f6f6',
                grayColor: '#f9fbfd',
                darkColor: '#223143',
                footerBgColor: '#282828',
                borderColor: '#E6E6E6',
                lightColor: '#999999',
                ratingColor: '#fa8c17'
            },
            rotate: {
                '360': '360deg',
            },
            width: {
                '15per': '15%',
                '20per': '20%',
                '30per': '30%',
            }
        },
    },
    important: true,
    plugins: [
        rotateX
    ]
}
