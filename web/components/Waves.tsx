
import devices from '@/utilities/devices'
import styled from 'styled-components'

const WavesContainer = styled.div<{ wavesColor: string }>`
	position: absolute;
	bottom: 3px;
	width: 100%;

	.waves {
		position:relative;
		width: 100%;
		height: 150px;
		margin-bottom:-7px;
		min-height:150px;
		max-height:150px;
		z-index: 13
	}

	.parallax > use {
		animation: moveForever 25s cubic-bezier(.55, .5, .45, .5) infinite;
	}
	.parallax > use:nth-child(1) {
		animation-delay: -1s;
		animation-duration: 5s;
		fill: ${({wavesColor}) => wavesColor};
		opacity: .7;
	}
	.parallax > use:nth-child(2) {
		animation-delay: -3s;
		animation-duration: 8s;
		fill: ${({wavesColor}) => wavesColor};
		opacity: .5;
	}
	.parallax > use:nth-child(3) {
		animation-delay: -7s;
		animation-duration: 12s;
		fill: ${({wavesColor}) => wavesColor};
		opacity: .2;
		position: relative;
	}
	.parallax > use:nth-child(4) {
		animation-delay: -5s;
		animation-duration: 17s;
		fill: ${({wavesColor}) => wavesColor};
		opacity: .8;
	}
	.parallax > use:nth-child(5) {
		animation-delay: -10s;
		animation-duration: 19s;
		fill: ${({wavesColor}) => wavesColor};
		opacity: .4;
	}

	@keyframes moveForever {
		0% {
			transform: translate3d(-90px, 0, 0);
		}
		100% {
			transform: translate3d(85px, 0, 0);
		}
	}

	@media screen and (${devices.mobile}) {
		.waves {
			position:relative;
			width: 100%;
			height: 90px;
			min-height:90px;
			max-height:90px;
			margin-bottom: -25px;
			z-index: 13
		}
	}
	@media screen and (${devices.minTablet}) and (${devices.maxTablet}) {
		.waves {
			position:relative;
			width: 100%;
			height: 90px;
			min-height:90px;
			max-height:90px;
			margin-bottom: -25px;
			z-index: 13
		}
	}
	@media screen and (${devices.minLaptop}) and (${devices.maxLaptop}) {
		.waves {
			position:relative;
			width: 100%;
			height: 90px;
			min-height:90px;
			max-height:90px;
			margin-bottom: -15px;
			z-index: 13
		}
	}
`

const Waves = ({ wavesColor }: { wavesColor: string }) => {
	return (
		<WavesContainer wavesColor={wavesColor}>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				xmlnsXlink='http://www.w3.org/1999/xlink'
				className='waves'
				preserveAspectRatio='none'
				viewBox='0 24 150 28'
			>
				<defs>
					<path
						id='gentle-wave'
						d='M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18v44h-352z'
					/>
				</defs>
				<g className='parallax'>
					<use
						x='48'
						y='9'
						xlinkHref='#gentle-wave2'
					/>
					<use
						x='48'
						y='3'
						xlinkHref='#gentle-wave'
					/>
					<use
						x='48'
						y='5'
						xlinkHref='#gentle-wave'
					>
					</use>
					<use
						x='48'
						y='7'
						xlinkHref='#gentle-wave'
					/>
					<use
						x='48'
						y='1'
						xlinkHref='#gentle-wave'
					/>
				</g>
			</svg>
		</WavesContainer>
	)
}

export default Waves
