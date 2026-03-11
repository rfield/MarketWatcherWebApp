<h1 class="banner-title">Home</h1>

{#if !form?.user}
    <p>Enter your credentials to begin.</p>
{:else}
    <p>Welcome, {form.user.givenName}!</p>
{/if}

<!-- src/routes/login/+page.svelte -->
<script>
    import { enhance } from '$app/forms';
    import { setCurrentAssets, setCurrentNotifications, setCurrentUser } from './stores.js';

    export let form;

    $: if (form?.success && form?.user) {
        setCurrentUser(form.user);
        setCurrentAssets(form.user.assets);
        setCurrentNotifications(form.user.notifications);
    }
</script>

{#if form?.error}
    <p style="color: red;">{form.error}</p>
{/if}

<form method="POST" use:enhance>
    <label>
        User name:
        <input name="username" type="text" placeholder="Enter your username" />
    </label>
    <br />
    <label>
        Password:
        <input name="password" type="password" placeholder="Enter your password" />
    </label>
    <br />
    <p></p>
    <button type="submit">Login</button>
</form>


