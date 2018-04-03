export default async token => {
    let authorized;
    try {
        const response = await fetch(`https://suggestify.io/api/authorize`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        authorized = await response.json();
    } catch (err) {
        //
    } finally {
      return authorized;
    }
};