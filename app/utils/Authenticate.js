export default async (token, dashboard = false, spaceSlug = false) => {
    let authorized;
    try {
        if (!dashboard && !spaceSlug) {
            const response = await fetch(`http://localhost:8000/api/authorize`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            authorized = await response.json();
        } else if (dashboard && spaceSlug) {
            const response = await fetch(`http://localhost:8000/api/authorize/${spaceSlug}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            authorized = await response.json();
        }
    } catch (err) {
        //
    } finally {
        return authorized;
    }
};