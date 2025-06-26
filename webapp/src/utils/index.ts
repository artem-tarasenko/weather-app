//Utility function to check if the screen width is wide (>= 640px)
export function isWideScreen(): boolean {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
        return false;
    }

    return window.innerWidth >= 640;
}

export function sanitizeString(value: string): string {
    return value
        .trim()
        .replace(
            /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu,
            '',
        );
}
