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
        // Example: Validate credentials (replace with your DB call)
        if (username !== 'rjfield777' || password !== 'foo') {
            console.log('Invalid credentials for:', { username });
            return fail(400, { error: 'Invalid credentials' });
        }

        console.log('Login successful for:', { username });
        // If successful, set cookie or session and redirect
        return { success: true, user: { username: username, givenName: 'Richard' } };
    }
};
