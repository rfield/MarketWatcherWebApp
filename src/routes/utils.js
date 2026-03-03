import { fail } from '@sveltejs/kit';

/**
 * @param {any} assetList
 */
export async function refreshPrices(assetList) {
    let names = ''
    for (const asset of assetList) {
        names += 'names=prices/' + asset.ticker + '&';
    }
    names = names.slice(0, -1); // Remove trailing ampersand

    const pricesResponse = await fetch(`http://localhost:8081/v1/prices:batchGet?${names}`, {
        method: 'GET',
    });
    if (!pricesResponse.ok) {
        console.log('Failed to retrieve prices for:', { assetSymbols: names, status: pricesResponse.status });
        return fail(400, { error: 'Failed to retrieve prices for assets.' });
    }
    const pricesData = await pricesResponse.json();
    const priceMap = {};
    for (const price of pricesData.prices) {
        priceMap[price.name] = price.price; // Create a map of ticker to price for easy lookup
    }

    for (const asset of assetList) {
        asset.price = priceMap['prices/' + asset.ticker]; // Add price to each asset
        asset.total = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            }).format(asset.holdingAmount * asset.price); // Format total value as currency
    }

    return assetList;
}

/**
 * @param {number} amount
 */
export function _toDollars(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
}
