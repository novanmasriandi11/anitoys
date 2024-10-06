const API_URL = 'https://api.h8-fern.foxhub.space/';

export const fetchSignIn = async (email, password) => {
    try {
        const response = await fetch(`${API_URL}login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Failed to sign in. Please check your credentials.');
        }

        const token = data.access_token;
        return {token, role: data.role, email: data.email, username: data.username, authorId: data.authorId};
    } catch (error) {
        console.error('Error during sign in: ', error);
        throw error;
    }
}

export const fetchRegister = async (email, password, username, phoneNumber, address) => {
    try {
        const response = await fetch(`${API_URL}seller/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, username, phoneNumber, address }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to sign up.');
        }
        return data;
    } catch (error) {
        console.error('Error:',error);
        throw error;
    }
}
