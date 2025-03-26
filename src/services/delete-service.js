export async function deleteService({workerId, url}) {
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(workerId),
    });

    console.log(response.status);

    const data = await response.json();
    return { response, data };
}
