
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'
import { THEME } from '../theme'
import '../theme/reset.css'

const App = ({ Component, pageProps }: AppProps) => {

	return (
		<>
			<Head>
				<title>Heemtree • </title>
				<meta name='description' content='une description' />
				<meta property='og:type' content='website' />
				<meta property='og:title' content='Heemtree' />
				<meta property='og:description' content='une description' />
				<meta property='og:image' content={`https://www.bruce.work`} />
				<meta property='og:image:url' content={`https://www.bruce.work`} />
				<meta property='og:url' content={''} />
				<meta property='og:site_name' content='Heemtree'/>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<meta name='theme-color' content='#fff' />
				<link rel='shortcut icon' type='image/x-icon' href='/src/public/favicon.ico' />
			</Head>
			<ThemeProvider theme={THEME}>
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	)
}

export default App
