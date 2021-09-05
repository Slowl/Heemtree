
import client from '@/api/client'
import devices from '@/utilities/devices'
import { urlFor } from '@/utilities/index'
import { LinkType, StatusType } from 'interfaces'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import styled from 'styled-components'
import Button from '../components/Button'
import StatusSection from '../components/StatusSection'
import Waves from '../components/Waves'

const MainContainer = styled.main`
	position: relative;
	min-height: 100vh;
	max-height: 100vh;
	padding: 0 1rem;
	z-index: 999;
`

const ButtonsContainer = styled.div<{ topShadow: boolean; bottomShadow: boolean; }>`
	min-height: 10vh;
	max-height: 40vh;
	width: 45%;
	margin: auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	overflow-y: auto;
	overflow-x: hidden;
	position: relative;

	scrollbar-color: ${({theme}) => theme.colors.greyDarker} rgba(0,0,0,0);
	scrollbar-width: thin;
	::-webkit-scrollbar {
		width: 3px;
	}
	::-webkit-scrollbar-button {
		width: 0px;
		height: 0px;
	}
	::-webkit-scrollbar-thumb {
		background: ${({theme}) => theme.colors.greyDarker};
		border: 0px;
	}
	::-webkit-scrollbar-thumb:hover {
		background: ${({theme}) => theme.colors.greyDarker};
	}
	::-webkit-scrollbar-thumb:active {
		background: ${({theme}) => theme.colors.greyDarker};
	}
	::-webkit-scrollbar-track {
		background: rgba(0,0,0,0);
		border: 0px none ${({theme}) => theme.colors.white};
	}
	::-webkit-scrollbar-track:hover {
		background: rgba(0,0,0,0);
	}
	::-webkit-scrollbar-track:active {
		background: rgba(0,0,0,0);
	}
	::-webkit-scrollbar-corner {
		background: transparent;
	}

	.top-shadow-container {
		position: sticky;
		top: 0;
		width: 92%;
		height: 100%;
		z-index: 200;
		:after {
			display: block;
			content: '';
			width: 100%;
			height: 12px;
			box-shadow: inset 0px 11px 12px -9px ${({topShadow}) => topShadow ? '#f3f3f3' : 'transparent'};
			transition: .3s;
		}
	}
	.bottom-shadow-container {
		position: sticky;
		bottom: 0;
		width: 92%;
		height: 100%;
		z-index: 200;
		:after {
			display: block;
			content: '';
			width: 100%;
			height: 12px;
			box-shadow: inset 0px -11px 12px -9px ${({bottomShadow}) => bottomShadow ? '#2e2e3a' : 'transparent'};
			transition: .3s;
		}
	}

	@media screen and (${devices.mobile}) {
		max-height: 33vh;
		width: 90%;
		min-width: 90%;
		.top-shadow-container {
			width: 94%;
		}
		.bottom-shadow-container {
			width: 94%;
		}
	}
	@media screen and (${devices.minTablet}) and (${devices.maxTablet}) {
	}
	@media screen and (${devices.minLaptop}) and (${devices.maxLaptop}) {
	}
`

const BoruContainer = styled.div`
	position: absolute;
	left: 16.2%;
	top: 250px;

	.boru-body {
		position: relative;
		z-index: 9;

		animation: BoatWaving 6s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
	}

	.boru-hands {
		position: absolute;
		left: 0px;
		top: 95px;
		z-index: 11;

		animation: BoatWaving 6s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
	}

	@media screen and (${devices.mobile}) {
		display: none;
	}
	@media screen and (${devices.minTablet}) and (${devices.maxTablet}) {
	}
	@media screen and (${devices.minLaptop}) and (${devices.maxLaptop}) {
	}
`

const GuardrailContainer = styled.div`
	position: absolute;
	left: 0;
	right: 0;
	top: 390px;
	z-index: 10;

	animation: BoatWaving 6s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;

	@media screen and (${devices.mobile}) {
	}
	@media screen and (${devices.minTablet}) and (${devices.maxTablet}) {
	}
	@media screen and (${devices.minLaptop}) and (${devices.maxLaptop}) {
	}
`

const HakuSharkContainer = styled.div`
	position: absolute;
	left: 13%;
	bottom: -40px;
	animation: HakuWave 4s cubic-bezier(.55, .5, .45, .5) infinite;
	z-index: 12;
	img {
		width: 15rem;
	}

	@media screen and (${devices.mobile}) {
		left: 45%;
		bottom: -60px;
		img {
			width: 10.5rem;
		}
	}
	@media screen and (${devices.minTablet}) and (${devices.maxTablet}) {
	}
	@media screen and (${devices.minLaptop}) and (${devices.maxLaptop}) {
	}
`

const MiruBeeContainer = styled.div`
	position: absolute;
	right: 13%;
	top: 120px;
	animation: MiruFly 1.4s cubic-bezier(.55, .5, .45, .5) infinite;

	@media screen and (${devices.mobile}) {
		display: none;
	}
	@media screen and (${devices.minTablet}) and (${devices.maxTablet}) {
	}
	@media screen and (${devices.minLaptop}) and (${devices.maxLaptop}) {
	}
`

const Index = ({ links, status }: { links: LinkType[], status: StatusType }) => {

	const [ bottomShadow, setBottomShadow ] = useState(true)
	const [ topShadow, setTopShadow ] = useState(false)

	const setButtonContainerShadows = (event: any) => {
		console.log(event)
		const target = event.target
		window.requestAnimationFrame(
			() => {
				if (target.scrollTop > 0) {
					setTopShadow(true)
				} else {
					setTopShadow(false)
				}
				if (target.scrollTop < (target.scrollTopMax ? target.scrollTopMax : (target.scrollHeight - target.clientHeight))) {
					setBottomShadow(true)
				} else {
					setBottomShadow(false)
				}
			},
		);
	}

	return (
		<>
			<Head>
				<meta property='og:image' content={`${urlFor(status.imageStatus).url()}`} />
				<meta property='og:image:url' content={`${urlFor(status.imageStatus).url()}`} />
			</Head>

			<BoruContainer>
				<img className='boru-body' src='/assets/images/boru-body.png' alt='boru body' />
				<img className='boru-hands' src='/assets/images/boru-hands.png' alt='boru hands' />
			</BoruContainer>
			<GuardrailContainer>
				<img alt='guardrail asset' src='/assets/images/guardrail.png' />
			</GuardrailContainer>
			<HakuSharkContainer>
				<img alt='haku shark floating' src='/assets/images/haku-shark.gif' />
			</HakuSharkContainer>
			<MiruBeeContainer>
				<img alt='miru bee flying' src='/assets/images/miru-bee.png' />
			</MiruBeeContainer>

			<MainContainer>
				<StatusSection status={status} />
				<ButtonsContainer
					onScroll={(e) => setButtonContainerShadows(e)}
					topShadow={topShadow}
					bottomShadow={bottomShadow}
				>
					<div className='top-shadow-container' />
					{links.map(
						(link: LinkType, index: number) => (
							<>
								<Button name={link.title} href={link.url} isAnimated={link.isAnimated} key={index} />
								<Button name={link.title} href={link.url} isAnimated={false} key={index} />
								<Button name={link.title} href={link.url} isAnimated={false} key={index} />
								<Button name={link.title} href={link.url} isAnimated={false} key={index} />
								<Button name={link.title} href={link.url} isAnimated={false} key={index} />
								<Button name={link.title} href={link.url} isAnimated={false} key={index} />
								<Button name={link.title} href={link.url} isAnimated={false} key={index} />
							</>
						),
					)}
					<div className='bottom-shadow-container' />
				</ButtonsContainer>
			</MainContainer>

			<Waves wavesColor='#86daf7' />
		</>
	)
}

//#region CONNEXION
export const getStaticProps: GetStaticProps = async () => {

	const status = await client.fetch(`*[_type == 'status'][0]{
		message,
		imageStatus
	  }`)
	const links = await client.fetch(`*[_type == 'links']{
		title,
		url,
		isAnimated
	}`)

	return {
		props: {
			links,
			status,
		},
	}
}
//#endregion

export default Index
