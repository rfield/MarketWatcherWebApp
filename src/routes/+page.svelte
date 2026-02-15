<h1 class="banner-title">Home</h1>

{#if !form?.user}
    <p>Enter your credentials to begin.</p>
{:else}
    <p>Welcome, {form.user.givenName}!</p>
{/if}

<!-- src/routes/login/+page.svelte -->
<script>
    import { enhance } from '$app/forms';
    import { currentUser, setCurrentUser } from './stores.js';

    export let form;

    $: if (form?.success && form?.user) {
        setCurrentUser(form.user);
    }
</script>

{#if form?.error}
    <p style="color: red;">{form.error}</p>
{/if}

<style>

  button {
    background-color: #6f5499; /* Purple background */
    color: white; /* White text color for contrast */
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }

  button:hover {
    background-color: rgb(81, 56, 120); /* Slightly darker purple on hover */
  }
</style>

<form method="POST" use:enhance>
    <label>
        User Name:
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


