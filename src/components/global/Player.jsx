import React, { useEffect, useState } from 'react'

// This component fetches from an Astro server endpoint (see instructions below)
export default function Player() {
    const [spin, setSpin] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch('/api/spins')
            .then((res) => {
                if (!res.ok) throw new Error('Network response was not ok')
                return res.json()
            })
            .then((data) => {
                if (data.items && data.items.length > 0) {
                    setSpin(data.items[0])
                } else {
                    setError('No spin data available')
                }
                setLoading(false)
            })
            .catch((err) => {
                setError(err.message)
                setLoading(false)
            })
    }, [])

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>
    if (!spin) return <div>No data</div>

    return (
        <div className="w-108 min-h-svh bg-gray-400">
            <div className="player-spin">
                {spin.image && (
                    <img
                        src={spin.image}
                        alt={spin.song || 'Spin image'}
                        style={{ maxWidth: 200 }}
                    />
                )}
                <div>Artist: {spin.artist}</div>
                <div>Release: {spin.release}</div>
                <div>Song: {spin.song}</div>
            </div>
        </div>
    )
}
