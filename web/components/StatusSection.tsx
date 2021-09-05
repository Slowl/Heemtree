
import devices from '@/utilities/devices'
import { urlFor } from '@/utilities/index'
import { StatusType } from 'interfaces'
import styled from 'styled-components'

const PresentationContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 5rem 0 4rem;
	img {
		width: 180px;
		height: 180px;
		border-radius: 50%;
		animation: BoatWaving 6s linear infinite;
	}

	@media screen and (${devices.mobile}) {
		padding: 4rem 0 1.5rem;
		img {
			width: 140px;
			height: 140px;
		}
	}
	@media screen and (${devices.minTablet}) and (${devices.maxTablet}) {
	}
`

const IntroText = styled.h1`
	margin: 0;
	text-transform: uppercase;
	text-align: center;
	padding-bottom: 2.2rem;
	color: ${({theme}) => theme.colors.blue};
	font-size: 2.5rem;
	letter-spacing: 2px;
	width: 95%;

	@media screen and (${devices.mobile}) {
		font-size: 1.7rem;
		letter-spacing: 1px;
	}
	@media screen and (${devices.minTablet}) and (${devices.maxTablet}) {
	}
	@media screen and (${devices.minLaptop}) and (${devices.maxLaptop}) {
	}
`

const StatusSection = ({ status }: { status: StatusType }) => {

	const STATUS_IMG = urlFor(status.imageStatus).width(180).height(180).url() as string

	return (
		<PresentationContainer>
			<IntroText>{status.message}</IntroText>
			<img alt='status image of Heemly' src={STATUS_IMG} />
		</PresentationContainer>
	)
}

export default StatusSection
