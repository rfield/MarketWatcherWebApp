<h1 class="banner-title">Notifications</h1>

<script>
  let { data } = $props();
</script>

<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Message</th>
    </tr>
  </thead>
  <tbody>
    <!-- Loop through the data -->
    {#each data.notifications as notification}
      <tr>
        <td>{notification.id}</td>
        <td>{notification.message}</td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  table { width: 50%; border-collapse: collapse; }
  th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
  th { background-color: #f2f2f2; }
</style>
