export default async token => {
    const response = await fetch(`https://innovationmesh.com/api/authorize`, {
        headers: { Authorization: `Bearer ${token}` },
    })
    const authorized = await response.json();
    return authorized;
}