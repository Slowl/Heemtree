
import client from '@/api/client'
import devices from '@/utilities/devices'
import { urlFor } from '@/utilities/index'
import { LinkType, StatusType } from 'interfaces'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import { HiChevronDown } from 'react-icons/hi'
import styled from 'styled-components'
import Button from '../components/Button'
import StatusSection from '../components/StatusSection'
import Waves from '../components/Waves'

//#region STYLE
const MainContainer = styled.main`
	position: relative;
	min-height: 100vh;
	max-height: 100vh;
	padding: 0 1rem;
	z-index: 999;
`

const ButtonsContainer = styled.div<{ topShadow: boolean; bottomShadow: boolean; }>`
	min-height: 10vh;
	max-height: 32vh;
	width: 45%;
	margin: 2rem auto .5rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	overflow-y: auto;
	overflow-x: hidden;
	position: relative;

	scrollbar-width: none;
	::-webkit-scrollbar {
		display: none;
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
	@media screen and (${devices.mobile}) and (max-height: 600px){
		.bottom-shadow-container {
			display: none;
		}
	}
	@media screen and (${devices.minTablet}) and (${devices.maxTablet}) {
		max-height: 35vh;
		width: 90%;
		min-width: 90%;
		.top-shadow-container {
			width: 94%;
		}
		.bottom-shadow-container {
			width: 94%;
		}
	}
	@media screen and (${devices.minTablet}) and (${devices.maxTablet}) and (max-height: 730px) {
		.bottom-shadow-container {
			display: none;
		}
	}
	/* LAPTOP WITH SMALL HEIGHT */
	@media screen and (${devices.minLaptop}) and (${devices.maxLaptop}) and (max-height: 860px){
		.bottom-shadow-container {
			display: none;
		}
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
		left: 12.5%;
	}
	/* TABLET SMALL WIDTH */
	@media screen and (${devices.minTablet}) and (max-width: 630px) {
		display: none;
	}
	@media screen and (min-width: 1921px) and (max-width: 2000px) {
		top: 270px;
	}
	@media screen and (min-width: 2001px) and (max-width: 4002px) {
		top: 240px;
	}
`

const GuardrailContainer = styled.div`
	position: absolute;
	left: 0;
	right: 0;
	top: 390px;
	z-index: 10;

	animation: BoatWaving 6s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;

	@media screen and (min-width: 1921px) and (max-width: 2000px) {
		display: none;
	}
	@media screen and (min-width: 2001px) and (max-width: 4002px) {
		display: none;
	}
`

const HakuSharkContainer = styled.div`
	position: absolute;
	left: 13%;
	bottom: -55px;
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
	/* MOBILE SMALL HEIGHT */
	@media screen and (${devices.mobile}) and (max-height: 600px){
		display: none;
	}
	@media screen and (${devices.minTablet}) and (${devices.maxTablet}) {
		left: 10%;
		bottom: -70px;
		animation: HakuWave 4s cubic-bezier(.55, .5, .45, .5) infinite;
		z-index: 12;
		img {
			width: 14rem;
		}
	}
	/* TABLET SMALL HEIGHT */
	@media screen and (${devices.minTablet}) and (${devices.maxTablet}) and (max-height: 790px) {
		display: none;
	}
	@media screen and (${devices.minLaptop}) and (${devices.maxLaptop}) {
		bottom: -75px;
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
		right: 10%;
		top: 130px;
	}
	/* TABLET SMALL WIDTH */
	@media screen and (${devices.minTablet}) and (max-width: 630px) {
		display: none;
	}
`

const BottomChevronContainer = styled.div<{ isVisible: boolean; }>`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 1.5rem;
	height: 1.5rem;
	margin: auto;
	border-radius: 50%;
	background-color: rgba(255, 255, 255, .8);
	cursor: pointer;
	visibility: ${({ isVisible }) => isVisible ? 'visible' : 'hidden'};
	opacity: ${({ isVisible }) => isVisible ? 1 : 0};
	transform: translateY(${({ isVisible }) => isVisible ? '0px' : '-4px'});
	transition: .25s;
	svg {
		font-size: 1.25rem;
		color: ${({ theme }) => theme.colors.black};
	}

	:hover {
		background-color: rgba(255, 255, 255, 1);
	}
`
//#endregion

//#region PAGE
const Index = ({ links, status }: { links: LinkType[], status: StatusType }) => {

	const ButtonsContainerRef = useRef<any>()
	const [ isScrollableBottom, SetIsScrollableBottom ] = useState(false)
	const [ isScrollableTop, setIsScrollableTop ] = useState(false)

	useEffect(
		() => {
			const currentRef = ButtonsContainerRef.current as any
			if (
				(currentRef?.scrollTop < (currentRef?.scrollTopMax ? currentRef?.scrollTopMax : (currentRef?.scrollHeight - currentRef?.clientHeight)))
			) {
				SetIsScrollableBottom(true)
			}
		},
		[],
	)

	const setButtonContainerShadows = (event: any) => {
		const target = event.target
		window.requestAnimationFrame(
			() => {
				if (target.scrollTop > 0) {
					setIsScrollableTop(true)
				} else {
					setIsScrollableTop(false)
				}
				if (target.scrollTop < (target.scrollTopMax ? target.scrollTopMax : (target.scrollHeight - target.clientHeight))) {
					SetIsScrollableBottom(true)
				} else {
					SetIsScrollableBottom(false)
				}
			},
		);
	}

	const ScrollToBottom = () => (
		ButtonsContainerRef.current.scrollBy({
			behavior: 'smooth',
			top: 110,
		})
	)

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
					topShadow={isScrollableTop}
					bottomShadow={isScrollableBottom}
					ref={ButtonsContainerRef}
				>
					<div className='top-shadow-container' />
						{links.map(
							(link: LinkType, index: number) => (
								<Button name={link.title} href={link.url} isAnimated={link.isAnimated} key={index} />
							),
						)}
					<div className='bottom-shadow-container' />
				</ButtonsContainer>
				<BottomChevronContainer
					isVisible={isScrollableBottom}
					onClick={() => ScrollToBottom()}
				>
					<HiChevronDown />
				</BottomChevronContainer>
			</MainContainer>

			<Waves wavesColor='#86daf7' />
		</>
	)
}
//#endregion

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
