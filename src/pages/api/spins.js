// src/pages/api/spins.js
// Astro endpoint to securely proxy Spinitron API requests

export async function GET() {
    const apiKey = import.meta.env.SPINITRON_API_KEY
    if (!apiKey) {
        return new Response(JSON.stringify({ error: 'API key not set' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        })
    }

    const url = `https://spinitron.com/api/spins?access-token=${apiKey}&station=kuaa&count=1&with=show,personas`

    try {
        const apiRes = await fetch(url)
        const data = await apiRes.json()
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        })
    } catch (err) {
        return new Response(
            JSON.stringify({ error: 'Failed to fetch spins' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        )
    }
}
