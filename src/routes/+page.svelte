
<h1>Home</h1>
<p>Welcome to the Market Watcher</p>
<p>Enter your username and password to log in.</p>

<!-- src/routes/login/+page.svelte -->
<script>
    // Form action data can be accessed here for error messages
    export let form;
</script>

{#if form?.error}
    <p style="color: red;">{form.error}</p>
{/if}

<form method="POST">
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

