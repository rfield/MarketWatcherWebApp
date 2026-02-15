// src/routes/login/+page.server.ts
import { fail } from '@sveltejs/kit';

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

        // Post the data to your external API
        const authResponse = await fetch('http://localhost:8081/v1/authenticate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Use environment variables for private API keys
            // 'Authorization': `Bearer ${process.env.EXTERNAL_API_KEY}` 
            },
            body: JSON.stringify({ username, password }),
        });

        if (!authResponse.ok) {
            console.log('Authentication failed for:', { username, status: authResponse.status });
            return fail(400, { error: 'Login failed. Please check your credentials.' });
        }

        console.log('Authentication successful for:', { username });

        const authData = await authResponse.json();
        const userResponse = await fetch(`http://localhost:8081/v1/users/${authData.userId}`, {
            method: 'GET',
            // headers: {
            //     'Authorization': `Bearer ${result.token}`,
            // },
        });

        if (!userResponse.ok) {
            console.log('Failed to retrieve user information for:', { username, status: userResponse.status });
            return fail(400, { error: 'Failed to retrieve user information.' });
        }

        const userData = await userResponse.json();
        console.log('User data retrieved:', userData);

        console.log('Login successful for:', { username });
        // return { success: true, user: { username: userData.user.username, givenName: userData.user.givenName} };
        return { success: true, user: userData.user };
    }
};
