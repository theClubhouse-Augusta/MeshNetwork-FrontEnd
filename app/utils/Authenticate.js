import Logger from './Logger';

export default async token => {
    try {
        const response = await fetch(`http://localhost:8000/api/authorize`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        const authorized = await response.json();
        return authorized;
    } catch (err) {
        Logger(`authorized: ${err}`)
    }
}

