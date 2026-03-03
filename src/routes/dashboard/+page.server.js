// import { assets } from './data.js';
import { refreshPrices } from '../utils.js';

export const actions = {
    default: async ({ request }) => {

		console.log('Inside default action handler for dashboard page server load');
		const formData = await request.formData();
		const assetsData = formData.get('assets');
		console.log('Received form data for assets:', assetsData);
		let assetList = [];
		try {
			assetList = JSON.parse(assetsData);
			console.log('Parsed asset list from form data:', assetList);
		} catch (error) {
			console.error('Error parsing assets data from form:', error);
			return { success: false, error: 'Invalid asset data format.' };
		}

		console.log('Refreshing prices for current assets:', assetList);
		const updatedAssetList = await refreshPrices(assetList);
		console.log('...Updated prices for asset list:', updatedAssetList);
		

		return { success: true, assets: updatedAssetList };
	}
}

