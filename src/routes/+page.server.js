// src/routes/login/+page.server.ts
import { fail } from '@sveltejs/kit';
import { refreshPrices } from './utils';

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const username = formData.get('username');
        const password = formData.get('password');

        console.log('Login attempt:', { username, password });

        if (!username || !password) {
            console.log('Missing username or password');
            return fail(400, { error: 'Username and password required' });
        }

        console.log('Validating credentials for:', { username, password });

        // Authenticate with external API, acquire user ID
        const authResponse = await fetch('http://localhost:8081/v1/users:authenticate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        if (!authResponse.ok) {
            console.log('Authentication failed for:', { username, status: authResponse.status });
            return fail(400, { error: 'Login failed. Please check your credentials.' });
        }
        console.log('Authentication successful for:', { username });

        // Retrieve user information using the acquired user ID
        const authData = await authResponse.json();
        const userResponse = await fetch(`http://localhost:8081/v1/users/${authData.userId}`, {
            method: 'GET',
        });
        if (!userResponse.ok) {
            console.log('Failed to retrieve user information for:', { username, status: userResponse.status });
            return fail(400, { error: 'Failed to retrieve user information.' });
        }

        // Load the user's portfoloio data
        const userData = await userResponse.json();
        console.log('User data retrieved:', userData);

        // Retrieve accounts
        const accountsResponse = await fetch(`http://localhost:8081/v1/users/${authData.userId}/accounts`, {
            method: 'GET',
        });
        if (!accountsResponse.ok) {
            console.log('Failed to retrieve accounts for:', { username, status: accountsResponse.status });
            return fail(400, { error: 'Failed to retrieve user accounts.' });
        }
        const accountsData = await accountsResponse.json();
        console.log('Accounts data retrieved:', accountsData);

        const allAssets = [];
        // Retrieve assets for each account
        for (const account of accountsData.accounts) {
            const assetsResponse = await fetch(`http://localhost:8081/v1/${account.name}/assets`, {
                method: 'GET',
            });
            if (!assetsResponse.ok) {
                console.log('Failed to retrieve assets for:', { username, status: assetsResponse.status });
                return fail(400, { error: 'Failed to retrieve user assets.' });
            }   
            const assetsData = await assetsResponse.json();

            for (const asset of assetsData.assets) {
                asset.accountName = account.accountName; // Add account name to each asset for easier access
            }
            allAssets.push(...assetsData.assets);
        }

        // Get prices and total value for all assets
        // let names = ''
        // for (const asset of allAssets) {
        //     names += asset.ticker + ','
        // }
        // names = names.slice(0, -1); // Remove trailing comma
        // const pricesResponse = await fetch(`http://localhost:8081/v1/prices:batchGet?names=${names}`, {
        //     method: 'GET',
        // });
        // if (!pricesResponse.ok) {
        //     console.log('Failed to retrieve prices for:', { username, assetSymbols: names, status: pricesResponse.status });
        //     return fail(400, { error: 'Failed to retrieve prices for assets.' });
        // }
        // const pricesData = await pricesResponse.json();
        // const priceMap = {};
        // for (const price of pricesData.prices) {
        //     priceMap[price.priceId] = price.price; // Create a map of ticker to price for easy lookup
        // }

        // for (const asset of allAssets) {
        //     asset.price = priceMap[asset.ticker]; // Add price to each asset
        //     asset.total = new Intl.NumberFormat('en-US', {
        //         style: 'currency',
        //         currency: 'USD',
        //         }).format(asset.holdingAmount * asset.price); // Format total value as currency
        // }
        const updatedAssetList = await refreshPrices(allAssets);

        // for (const asset of allAssets) {
        //     const priceResponse = await fetch(`http://localhost:8081/v1/prices/${asset.ticker}`, {
        //         method: 'GET',
        //     });
        //     if (!priceResponse.ok) {
        //         console.log('Failed to retrieve price for:', { username, assetSymbol: asset.symbol, status: priceResponse.status });
        //         return fail(400, { error: `Failed to retrieve price for asset ${asset.symbol}.` });
        //     }
        //     const priceData = await priceResponse.json();
        //     asset.price = priceData.price.price; // Add price to each asset
        //     asset.total = new Intl.NumberFormat('en-US', {
        //         style: 'currency',
        //         currency: 'USD',
        //         }).format(asset.holdingAmount * asset.price); // Format total value as currency
        // }
             
        console.log('All assets retrieved:', updatedAssetList);
        return { success: true, user: { ...userData.user, assets: updatedAssetList } };
    }
};
