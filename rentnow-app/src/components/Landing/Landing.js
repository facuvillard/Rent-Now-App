import React from 'react'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Navbar from 'components/Landing/Navbar'
import Hero from 'components/Landing/Hero/Hero'
import HowItWorks from 'components/Landing/HowItWorks/HowItWorks'
import AboutUs from 'components/Landing/About/AboutUs'
import Aplications from 'components/Landing/Aplications/Aplications';
import Footer from 'components/Landing/Footer/Footer';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#FCC931",
        },
        secondary: {
            main: "#3F4652",
            dark: "rgba(33,33,33, 0.8)"
        }
    },
    typography: {
        fontFamily: "'Raleway', sans-serif",
        h2: {
            fontFamily: "'Raleway', sans-serif"
        },
        h3: {
            fontFamily: "'Raleway', sans-serif"
        },
        h4: {
            fontFamily: "'Raleway', sans-serif"
        },
        h5: {
            fontFamily: "'Raleway', sans-serif"
        },
        h6: {
            fontFamily: "'Raleway', sans-serif"
        },
    }
})

const Landing = () => {
    return (
        <ThemeProvider theme={theme}>
            <Navbar />
            <Hero />
            <HowItWorks />
            <AboutUs />
            <Aplications />
            <Footer />
        </ThemeProvider>
    )
}

export default Landing
