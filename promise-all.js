async function loadUsers() {
  try {
    // First fetch the list
    const listResponse = await fetch(
      "https://jsonplaceholder.typicode.com/users",
    );

    if (!listResponse.ok) {
      throw new Error(`HTTP error: ${listResponse.status}`);
    }

    const users = await listResponse.json();

    // Take the first two users
    const firstTwoUsers = users.slice(0, 2);

    // Fetch details for both users in parallel
    const requests = firstTwoUsers.map(async (user) => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${user.id}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      return response.json();
    });

    const details = await Promise.all(requests);

    console.log("First two users:");
    console.log(details);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

loadUsers();
