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
        console.log('Received price data:', price);
        priceMap[price.name] = {'price': price.price, 'change': price.priceChange}; // Create a map of ticker to price for easy lookup
    }

    for (const asset of assetList) {
        asset.priceChange = priceMap['prices/' + asset.ticker].change;
        asset.price = priceMap['prices/' + asset.ticker].price; // Add price to each asset
        asset.total = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            }).format(asset.holdingAmount * asset.price); // Format total value as currency
        console.log(`Updated asset: ${asset.ticker}, Price: ${asset.price}, Price Change: ${asset.priceChange}, Total: ${asset.total}`);
    }

    return assetList;
}

/**
 * @param {string} userId
 */
export async function refreshNotifications(userId) {

    console.log('Refreshing notifications for userId:', userId);

    const notificationsResponse = await fetch(`http://localhost:8081/v1/${userId}/notifications`, {
        method: 'GET',
    });
    if (!notificationsResponse.ok) {
        console.log('Failed to retrieve notifications for:', { userId, status: notificationsResponse.status });
        return fail(400, { error: 'Failed to retrieve user notifications.' });
    }
    const notificationsData = await notificationsResponse.json();
    console.log('Notifications data retrieved:', notificationsData);

    // const response = await fetch(`http://localhost:8081/v1/${userId}/notifications`, {
    //     method: 'GET',
    // });
    // if (!response.ok) {
    //     console.log('Failed to retrieve notifications:', { status: response.status });
    //     return fail(400, { error: 'Failed to retrieve notifications.' });
    // }
    // const data = await response.json();
    // console.log('Received notifications data:', data);
    
    return notificationsData.notifications;
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
