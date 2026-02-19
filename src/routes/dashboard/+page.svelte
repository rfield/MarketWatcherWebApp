<h1 class="banner-title">Dashboard</h1>

<p>Click REFRESH to update prices.</p>

<script>
  import { currentUser } from '../stores.js';
  import { currentAssets } from '../stores.js';

  let { data } = $props();
</script>

<p>Welcome back, {$currentUser?.givenName || 'Guest'}!</p>

<table>
  <thead>
    <tr>
	  <th>Portfolio</th>
      <th>Ticker</th>
      <th>Price</th>
      <th>Units</th>
      <th>Total</th>
    </tr>
  </thead>
  <tbody>
    <!-- Loop through the data -->
    {#each $currentAssets as asset}
      <tr>
        <td>{asset.accountName}</td>
        <td>{asset.ticker}</td>
        <td>{asset.price}</td>
        <td>{asset.holdingAmount}</td>
        <td>{asset.total}</td>
      </tr>
    {/each}
  </tbody>
</table>

<p></p>
<button onclick={() => alert('Refreshed!')}>REFRESH</button>

<style>
  table { width: 50%; border-collapse: collapse; }
  th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
  th { background-color: #f2f2f2; }
</style>
