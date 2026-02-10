import { assets } from './data.js';

export function load() {
	return {
		assetList: assets.map((asset) => ({
            account: asset.account,
			ticker: asset.ticker,
			price: asset.price,
			holdingAmount: asset.holdingAmount,
			total: asset.price * asset.holdingAmount
		}))
	};
}
