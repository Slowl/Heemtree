
import devices from '@/utilities/devices';
import styled from 'styled-components';

interface ButtonProps {
	name: string;
	href: string;
	isAnimated?: boolean;
}

const ButtonContainer = styled.a<{ isAnimated?: boolean }>`
	width: 90%;
	max-width: 50rem;
	padding: .9rem 0rem;
	margin: 1.2rem 0;
	border: 2px solid ${({theme}) => theme.colors.blue};
	background-color: ${({theme}) => theme.colors.blue};
	color: ${({theme}) => theme.colors.white};
	border-radius: 80px;
	cursor: pointer;
	font-size: 1.25rem;
	letter-spacing: 1px;
	text-align: center;
	text-decoration: none;
	text-transform: uppercase;
	transition: .3s;
	animation: 3s linear 0s infinite normal none running ${({isAnimated}) => isAnimated ? 'Jiggle' : ''};

	:hover {
		background-color: ${({theme}) => theme.colors.grey};
		color: ${({theme}) => theme.colors.blue};
	}

	@keyframes Jiggle {
		0% {
			transform: translateX(3px) rotate(1deg);
		}
		2.5% {
			transform: translateX(-3px) rotate(-1deg);
		}
		5% {
			transform: translateX(3px) rotate(1deg);
		}
		7.5% {
			transform: translateX(-3px) rotate(-1deg);
		}
		10% {
			transform: translateX(2px) rotate(1deg);
		}
		12.5% {
			transform: translateX(-2px) rotate(-1deg);
		}
		15% {
			transform: translateX(2px) rotate(1deg);
		}
		17.5% {
			transform: translateX(-2px) rotate(-1deg);
		}
		20% {
			transform: translateX(1px) rotate(1deg);
		}
		22.5% {
			transform: translateX(-1px) rotate(-1deg);
		}
		25% {
			transform: translateX(0px) rotate(0deg);
		}
	}

	@media screen and (${devices.mobile}) {
		padding: .45rem .3rem;
		font-size: .9rem;
		margin: .5rem 0;
	}
	@media screen and (${devices.minTablet}) and (${devices.maxTablet}) {
	}
	@media screen and (${devices.minLaptop}) and (${devices.maxLaptop}) {
	}
`

const Button = ({ name, href, isAnimated }: ButtonProps) => {
	return (
		<ButtonContainer
			href={href}
			isAnimated={isAnimated}
			target='_blank'
			rel='noreferrer noopener'
		>
			{name}
		</ButtonContainer>
	)
}

export default Button
