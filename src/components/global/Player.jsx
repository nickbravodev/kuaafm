import React, { useEffect, useRef, useState } from 'react'
// We'll use colorthief for dominant color extraction
import ColorThief from 'colorthief'

// Helper: Convert RGB to HSL
function rgbToHsl(r, g, b) {
    r /= 255
    g /= 255
    b /= 255
    const max = Math.max(r, g, b),
        min = Math.min(r, g, b)
    let h,
        s,
        l = (max + min) / 2
    if (max === min) {
        h = s = 0
    } else {
        const d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0)
                break
            case g:
                h = (b - r) / d + 2
                break
            case b:
                h = (r - g) / d + 4
                break
        }
        h /= 6
    }
    return [h * 360, s, l]
}

// ...end of rgbToHsl and helpers...

export default function Player() {
    // React state and refs
    const [spin, setSpin] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [muted, setMuted] = useState(true)
    const [recentSpins, setRecentSpins] = useState([])
    const [recentError, setRecentError] = useState(null)
    const [showRecent, setShowRecent] = useState(false)
    const audioRef = useRef(null)
    const imgRef = useRef(null)
    const defaultBg = '#e5e7eb' // Tailwind gray-200

    // Fetch spin and recent spins
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
        const fetchRecentSpins = () => {
            fetch('/api/recent-spins')
                .then((res) => {
                    if (!res.ok) throw new Error('Network response was not ok')
                    return res.json()
                })
                .then((data) => {
                    if (!isMounted) return
                    if (data.items && data.items.length > 0) {
                        setRecentSpins(data.items)
                        setRecentError(null)
                    } else {
                        setRecentError('No recent spins available')
                    }
                })
                .catch((err) => {
                    if (!isMounted) return
                    setRecentError(err.message)
                })
        }
        fetchSpin()
        fetchRecentSpins()
        const interval = setInterval(() => {
            fetchSpin()
            fetchRecentSpins()
        }, 5000)
        return () => {
            isMounted = false
            clearInterval(interval)
        }
    }, [])

    // Extract dominant color from spin.image and set as CSS variables on body
    useEffect(() => {
        const setVars = (bgRgbArr) => {
            // Get mode
            const mode = getMode()
            // Convert to HSL
            let [h, s, l] = rgbToHsl(...bgRgbArr)
            // Force luminance for mode
            if (mode === 'dark') {
                l = clamp(l, 0, 0.18) // keep it dark
            } else {
                l = clamp(l, 0.85, 1) // keep it light
            }
            const bgRgb = hslToRgb(h, s, l)
            const bg = `rgb(${bgRgb[0]}, ${bgRgb[1]}, ${bgRgb[2]})`
            // Component bg: lighter in light, darker in dark
            let compL =
                mode === 'dark'
                    ? clamp(l + 0.08, 0, 0.26)
                    : clamp(l - 0.08, 0.7, 0.97)
            const compRgb = hslToRgb(h, s, compL)
            const compBg = `rgb(${compRgb[0]}, ${compRgb[1]}, ${compRgb[2]})`
            // Text color: 180deg hue shift, opposite luminance
            let textH = (h + 180) % 360
            let textL = mode === 'dark' ? 0.95 : 0.1
            const textRgb = hslToRgb(textH, s, textL)
            const text = `rgb(${textRgb[0]}, ${textRgb[1]}, ${textRgb[2]})`
            document.body.style.setProperty('--kuaa-bg', bg)
            document.body.style.setProperty('--kuaa-bg-component', compBg)
            document.body.style.setProperty('--kuaa-text', text)
        }
        if (!spin || !spin.image) {
            document.body.style.setProperty('--kuaa-bg', defaultBg)
            document.body.style.setProperty('--kuaa-bg-component', '#fff')
            document.body.style.setProperty('--kuaa-text', '#222')
            return
        }
        const img = new window.Image()
        img.crossOrigin = 'Anonymous'
        img.src = spin.image
        img.onload = () => {
            try {
                const colorThief = new ColorThief()
                const color = colorThief.getColor(img)
                setVars(color)
            } catch (e) {
                document.body.style.setProperty('--kuaa-bg', defaultBg)
                document.body.style.setProperty('--kuaa-bg-component', '#fff')
                document.body.style.setProperty('--kuaa-text', '#222')
            }
        }
        img.onerror = () => {
            document.body.style.setProperty('--kuaa-bg', defaultBg)
            document.body.style.setProperty('--kuaa-bg-component', '#fff')
            document.body.style.setProperty('--kuaa-text', '#222')
        }
    }, [spin?.image])

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
        <div className="min-h-screen w-full font-sans flex items-end justify-end pb-12">
            <div
                className="relative max-w-lg w-full mx-auto flex flex-col items-center justify-end h-full"
                style={{ height: 'calc(100vh - 3rem)' }}
            >
                {/* Main Player Card */}
                <div className="relative z-10 flex flex-col items-center w-full h-full rounded-3xl shadow-2xl bg-white/30 dark:bg-black/30 backdrop-blur-lg border border-white/40 dark:border-black/40 p-8 pt-10 pb-8">
                    <img
                        ref={imgRef}
                        src={
                            spin.image ||
                            '/assets/images/now-playing-fallback.png'
                        }
                        alt={spin.song || 'Spin image'}
                        className="w-40 h-40 object-cover rounded-2xl mb-4 shadow-lg border-4 border-white/60 dark:border-black/60"
                        crossOrigin="anonymous"
                    />
                    <div className="text-3xl font-extrabold mb-1 text-center drop-shadow-lg">
                        {spin.song}
                    </div>
                    <div className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-1 text-center">
                        {spin.artist}
                    </div>
                    <div className="text-md text-gray-600 dark:text-gray-300 mb-4 text-center">
                        {spin.release}
                    </div>
                    <div className="flex gap-4 mb-2">
                        <button
                            onClick={handleToggleMute}
                            className="flex items-center px-4 py-2 rounded-full bg-white/70 dark:bg-black/50 hover:bg-white/90 dark:hover:bg-black/70 shadow transition-colors text-lg font-medium border border-white/40 dark:border-black/40"
                            aria-label={muted ? 'Unmute audio' : 'Mute audio'}
                        >
                            {muted ? (
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
                            <span className="ml-2 font-bold">
                                {muted ? 'Unmute' : 'Mute'}
                            </span>
                        </button>
                        <button
                            onClick={() => setShowRecent(true)}
                            className="flex items-center px-4 py-2 rounded-full bg-white/70 dark:bg-black/50 hover:bg-white/90 dark:hover:bg-black/70 shadow transition-colors text-lg font-medium border border-white/40 dark:border-black/40"
                        >
                            <svg
                                width="24"
                                height="24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                viewBox="0 0 24 24"
                            >
                                <circle cx="12" cy="12" r="10" />
                                <path d="M8 12h8M12 8v8" />
                            </svg>
                            <span className="ml-2 font-bold">Recent Spins</span>
                        </button>
                        <audio
                            ref={audioRef}
                            src="https://stream.xmission.com/kuaa"
                            autoPlay
                            muted={muted}
                        />
                    </div>
                </div>
                {/* Recent Spins Popup (inside player card) */}
                {showRecent && (
                    <div className="absolute inset-0 z-30 flex flex-col">
                        <div className="flex-1 w-full h-full bg-white/90 dark:bg-black/90 rounded-2xl shadow-2xl p-6 flex flex-col overflow-y-auto border border-white/40 dark:border-black/40 animate-fade-in">
                            <button
                                onClick={() => setShowRecent(false)}
                                className="absolute top-3 right-3 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 shadow"
                                aria-label="Close recent spins"
                            >
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                            <h2 className="text-xl font-bold mb-4 text-center">
                                Recent Spins
                            </h2>
                            {recentError && (
                                <div className="text-red-600">
                                    Error: {recentError}
                                </div>
                            )}
                            <ul className="space-y-4">
                                {recentSpins.map((item, idx) => (
                                    <li
                                        key={item.id || idx}
                                        className="flex items-center bg-white/70 dark:bg-black/50 rounded-lg shadow p-3"
                                    >
                                        <img
                                            src={
                                                item.image ||
                                                '/assets/images/now-playing-fallback.png'
                                            }
                                            alt={item.song || 'Spin image'}
                                            className="w-16 h-16 object-cover rounded mr-4"
                                            crossOrigin="anonymous"
                                        />
                                        <div>
                                            <div className="font-semibold">
                                                {item.song}
                                            </div>
                                            <div className="text-gray-700 dark:text-gray-200">
                                                {item.artist}
                                            </div>
                                            <div className="text-gray-500 text-sm dark:text-gray-300">
                                                {item.release}
                                            </div>
                                            <div className="text-xs text-gray-400 mt-1">
                                                {item.end
                                                    ? timeAgoOrNow(item.end)
                                                    : ''}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

// Helper to display how long ago a song played, or 'Now Playing' if end is in the future
function timeAgoOrNow(dateString) {
    const date = new Date(dateString)
    const now = new Date()
    if (date > now) return 'Now Playing'
    const seconds = Math.floor((now - date) / 1000)
    if (seconds < 60) return `${seconds} seconds ago`
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes} minutes ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours} hours ago`
    const days = Math.floor(hours / 24)
    return `${days} days ago`
}
