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
        console.log('Authentication data received:', authData);
        const userResponse = await fetch(`http://localhost:8081/v1/${authData.name}`, {
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
        const accountsResponse = await fetch(`http://localhost:8081/v1/${authData.name}/accounts`, {
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

            // Add account name to the first asset only in each account for a nice display
            assetsData.assets[0].accountName = account.accountName; 

            allAssets.push(...assetsData.assets);
        }

        const updatedAssetList = await refreshPrices(allAssets);

             
        console.log('All assets retrieved:', updatedAssetList);
        return { success: true, user: { ...userData.user, assets: updatedAssetList } };
    }
};
