import React, { useEffect, useRef, useState } from 'react'

// This component fetches from an Astro server endpoint (see instructions below)
export default function Player() {
    const [spin, setSpin] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [muted, setMuted] = useState(true)
    const audioRef = useRef(null)

    useEffect(() => {
        let isMounted = true
        const fetchSpin = () => {
            fetch('/api/spins')
                .then((res) => {
                    if (!res.ok) throw new Error('Network response was not ok')
                    return res.json()
                })
                .then((data) => {
                    if (!isMounted) return
                    if (data.items && data.items.length > 0) {
                        setSpin(data.items[0])
                        setError(null)
                    } else {
                        setError('No spin data available')
                    }
                    setLoading(false)
                })
                .catch((err) => {
                    if (!isMounted) return
                    setError(err.message)
                    setLoading(false)
                })
        }
        fetchSpin()
        const interval = setInterval(fetchSpin, 5000) // 5 seconds
        return () => {
            isMounted = false
            clearInterval(interval)
        }
    }, [])

    // Keep audio muted state in sync
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.muted = muted
        }
    }, [muted])

    const handleToggleMute = () => {
        setMuted((prev) => !prev)
    }

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>
    if (!spin) return <div>No data</div>

    return (
        <div className="w-108 min-h-svh bg-gray-400">
            <div className="player-spin">
                <img
                    src={
                        spin.image || '/assets/images/now-playing-fallback.png'
                    }
                    alt={spin.song || 'Spin image'}
                    style={{ maxWidth: 200 }}
                />
                <div>Song: {spin.song}</div>
                <div>Artist: {spin.artist}</div>
                <div>Release: {spin.release}</div>
                <div style={{ marginTop: 16 }}>
                    <button
                        onClick={handleToggleMute}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: 32,
                            display: 'flex',
                            alignItems: 'center',
                        }}
                        aria-label={muted ? 'Unmute audio' : 'Mute audio'}
                    >
                        {muted ? (
                            // Play icon (muted)
                            <svg
                                width="32"
                                height="32"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <polygon points="5 3 19 12 5 21 5 3" />
                                <line
                                    x1="1"
                                    y1="1"
                                    x2="23"
                                    y2="23"
                                    stroke="red"
                                    strokeWidth="2"
                                />
                            </svg>
                        ) : (
                            // Play icon (unmuted)
                            <svg
                                width="32"
                                height="32"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <polygon points="5 3 19 12 5 21 5 3" />
                            </svg>
                        )}
                        <span style={{ marginLeft: 8 }}>
                            {muted ? 'Unmute' : 'Mute'}
                        </span>
                    </button>
                    <audio
                        ref={audioRef}
                        src="https://stream.xmission.com/kuaa"
                        autoPlay
                        muted={muted}
                    />
                </div>
            </div>
        </div>
    )
}
