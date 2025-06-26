//Utility function to check if the screen width is wide (>= 640px)
export function isWideScreen(): boolean {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
        return false;
    }

    return window.innerWidth >= 640;
}
