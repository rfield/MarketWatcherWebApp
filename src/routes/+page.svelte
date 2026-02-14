<h1>Home</h1>
<p>Welcome to the Market Watcher</p>
<p>Enter your username and password to log in.</p>

<!-- src/routes/login/+page.svelte -->
<script>
    import { enhance } from '$app/forms';
    import { currentUser, setCurrentUser } from './stores.js';
    // import { goto } from '$app/navigation';

    export let form;

    $: if (form?.success && form?.user) {
        setCurrentUser(form.user);
        // goto('/dashboard'); // Redirect to dashboard after successful login
    }
</script>

{#if form?.error}
    <p style="color: red;">{form.error}</p>
{/if}


<form method="POST" use:enhance>
    <label>
        Username:
        <input name="username" type="text" required />
    </label>
    <br />
    <label>
        Password:
        <input name="password" type="password" required />
    </label>
    <br />
    <button type="submit">Sign In</button>
</form>

<p>Welcome back, {$currentUser?.givenName || 'Guest'}!</p>