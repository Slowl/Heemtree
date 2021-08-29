
// client.js
import sanityClient from '@sanity/client'

export default sanityClient({
	apiVersion: 'v1',
	dataset: process.env.SANITY_DATASET, // or the name you chose in step 1
  	projectId: process.env.SANITY_PROJECT_ID, // you can find this in sanity.json
  	useCdn: true, // `false` if you want to ensure fresh data
})
