<script>
	import '../global.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<style>
	:global(body) {
		margin: 5px;
		padding: 0;
		background-color: #f9f9f9; /* Light background for a clean look */
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Modern, readable font */
	}
</style>

<nav>
	<a href="/">Home</a>
	   |   
	<a href="/dashboard">Dashboard</a>
	   |   
    <a href="/notifications">Notifications</a>
	<p></p>
</nav>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
