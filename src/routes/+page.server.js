// src/routes/login/+page.server.ts
import { fail } from '@sveltejs/kit';

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const username = formData.get('username');
        const password = formData.get('password');

        if (!username || !password) {
            return fail(400, { error: 'Username and password required' });
        }

        // Example: Validate credentials (replace with your DB call)
        if (username !== 'rjfield777' || password !== 'foo') {
            return fail(400, { error: 'Invalid credentials' });
        }

        // If successful, set cookie or session and redirect
        return { success: true };
    }
};
