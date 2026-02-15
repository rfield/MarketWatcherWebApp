<h1 class="banner-title">Dashboard</h1>

<p>Press the START button to begin streaming prices.</p>

<script>
  import { currentUser } from '../stores.js';

  let { data } = $props();
</script>

<p>Welcome back, {$currentUser?.givenName || 'Guest'}!</p>

<table>
  <thead>
    <tr>
	  <th>Account</th>
      <th>Ticker</th>
      <th>Price</th>
      <th>Holding Amount</th>
      <th>Total Value</th>
    </tr>
  </thead>
  <tbody>
    <!-- Loop through the data -->
    {#each data.assetList as asset}
      <tr>
        <td>{asset.account}</td>
        <td>{asset.ticker}</td>
        <td>{asset.price}</td>
        <td>{asset.holdingAmount}</td>
        <td>{asset.total}</td>
      </tr>
    {/each}
  </tbody>
</table>

<button onclick={() => alert('Streaming started!')}>START</button>

<style>
  table { width: 50%; border-collapse: collapse; }
  th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
  th { background-color: #f2f2f2; }
</style>
