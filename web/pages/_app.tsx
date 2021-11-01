
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'
import { THEME } from '../theme'
import '../theme/initial.css'

const App = ({ Component, pageProps }: AppProps) => {

	return (
		<>
			<Head>
				<title>Heemly • Links</title>
				<meta name='description' content="A little stationery creator with some great links to share with you cause I'm on my mission to make your life happier" />
				<meta property='og:type' content='website' />
				<meta property='og:title' content='Heemly' />
				<meta property='og:description' content="A little stationery creator with some great links to share with you cause I'm on my mission to make your life happier" />
				<meta property='og:url' content={''} />
				<meta property='og:site_name' content='Heemly'/>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<meta name='theme-color' content='#ececec' />
				<link rel='shortcut icon' type='image/x-icon' href='/assets/images/favicon.png' />
			</Head>
			<ThemeProvider theme={THEME}>
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	)
}

export default App
