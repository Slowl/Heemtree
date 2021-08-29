
import client from '@/api/client'
import { GetStaticProps } from 'next'

const Index = ({ links }: any) => {

	return (
		<div>
			hello world
		</div>
	)
}

//#region CONNEXION
export const getStaticProps: GetStaticProps = async () => {

	const links = await client.fetch(`*[_type == 'links']`, { links: {} })

	return {
		props: {
			links,
		},
	}
}
//#endregion

export default Index
