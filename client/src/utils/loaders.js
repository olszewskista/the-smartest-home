export async function userLoader() {
    try {
        const response = await fetch('http://localhost:3000/auth/', {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) throw new Error('Error while fetching user data');
        const data = await response.json();
        return data;
    } catch (error) {
        return null
    }
}