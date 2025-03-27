const url = 'http://89.104.67.119:1337/api/people';

export const updateUserDateService = async (id, data) => {
    try {
        const response = await fetch(`${url}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        });
        
        return {
            response,
            data: await response.json()
        };
    } catch (error) {
        throw new Error(error.message);
    }
};