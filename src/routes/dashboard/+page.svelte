<h1 class="banner-title">Dashboard</h1>

<p>Click REFRESH to update prices.</p>

<script>
  import { currentUser, setCurrentUser, currentAssets, setCurrentAssets } from '../stores.js';
  import { _toDollars, refreshPrices } from '../utils.js';
  import { enhance } from '$app/forms';

    export let form;

    $: if (form?.success && form?.assets) {
        setCurrentAssets(form.assets);
    }
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
        <td style="background-color: #b3ecf5; font-style: italic;">{asset.accountName}</td>
        <td>{asset.ticker}</td>
        <td>{asset.price}</td>
        <td>{asset.holdingAmount}</td>
        <td style="text-align: right;">{asset.total}</td>
      </tr>
    {/each}
  </tbody>
  <tfoot>
    <tr>
      <td style="font-weight: bold;">Total</td>
      <td colspan="4" style="font-weight: bold; text-align: right;">
        {_toDollars($currentAssets.reduce((sum, asset) => sum + (asset.holdingAmount * asset.price), 0))}
        <!--${$currentAssets.reduce((sum, asset) => sum + (asset.holdingAmount * asset.price), 0).toFixed(2)}-->
      </td>
    </tr>
  </tfoot>
</table>

<p></p>
<form method="POST" use:enhance>
  <input type="hidden" name="assets" value={JSON.stringify($currentAssets)} />
  <button type="submit">REFRESH</button>
</form>

<style>
  table { width: 50%; border-collapse: collapse; }
  th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
  th, tfoot td { background-color: #f2f2f2; }
</style>
