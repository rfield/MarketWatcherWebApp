<h1 class="banner-title">Notifications</h1>

<script>
  import { currentNotifications } from '../stores.js';  
  let { data } = $props();

</script>

<table>
  <thead>
    <tr>
      <th>Date/Time</th>
      <th>Title</th>
      <th>Message</th>
    </tr>
  </thead>
  <tbody>
    <!-- Loop through the data -->
    {#each $currentNotifications as notification}
      <tr>
        <td>{notification.createdAt}</td>
        <td>{notification.title}</td>
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
