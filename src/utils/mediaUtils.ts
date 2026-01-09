
export const getMediaType = (url: string | undefined | null): 'youtube' | 'video' | 'image' | 'none' => {
    if (!url) return 'none';

    // YouTube Detection
    if (url.match(/(youtube\.com|youtu\.be)/i)) return 'youtube';

    // Direct Video Detection
    if (url.match(/\.(mp4|webm|mov)$/i)) return 'video';

    // Default to image (assuming url exists)
    return 'image';
};

export const getYouTubeEmbedUrl = (url: string): string | null => {
    if (!url) return null;

    let videoId = '';

    // Handle youtube.com/shorts/ID
    const matchShorts = url.match(/shorts\/([a-zA-Z0-9_-]+)/);
    if (matchShorts) {
        videoId = matchShorts[1];
    } else {
        // Handle youtube.com/watch?v=ID
        const matchV = url.match(/[?&]v=([^&]+)/);
        if (matchV) {
            videoId = matchV[1];
        } else {
            // Handle youtu.be/ID
            const matchShort = url.match(/youtu\.be\/([^?]+)/);
            if (matchShort) {
                videoId = matchShort[1];
            } else {
                // Try extracting last segment if it looks like an ID
                const segments = url.split('/');
                const last = segments[segments.length - 1];
                if (last.length === 11) videoId = last;
            }
        }
    }

    if (!videoId) return null;

    // Standard Embed URL with params
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=1&loop=1&playlist=${videoId}&playsinline=1`;
};
