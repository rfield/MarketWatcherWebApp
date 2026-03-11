<h1 class="banner-title">Notifications</h1>

<script>
  import { currentUser, currentNotifications, setCurrentNotifications } from '../stores.js';  
  import { enhance } from '$app/forms';

    export let form;

    $: if (form?.success && form?.notifications) {
        setCurrentNotifications(form.notifications);
    }

</script>

<table>
  <thead>
    <tr>
      <th>Title</th>
      <th>Message</th>
      <th>Date/Time</th>
    </tr>
  </thead>
  <tbody>
    <!-- Loop through the data -->
    {#each $currentNotifications as notification}
      <tr>
        <td style="font-style: italic">{notification.title}</td>
        <td>{notification.message}</td>
        <td>{new Date(notification.createdAt).toLocaleString()}</td>
      </tr>
    {/each}
  </tbody>
</table>

<p></p>
<form method="POST" use:enhance>
  <input type="hidden" name="userName" value={JSON.stringify($currentUser.name)} />
  <button type="submit">REFRESH</button>
</form>

<style>
  table { width: 50%; border-collapse: collapse; }
  th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
  th { background-color: #f2f2f2; }
</style>
