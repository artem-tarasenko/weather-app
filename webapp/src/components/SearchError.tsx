import { X } from 'lucide-react';

export default function SearchError({ hasError, onReset }: { hasError: boolean; onReset?: () => void }) {
    if (!hasError) return;
    return (
        <div className="weather-error-container pl-4 pr-2 py-1 mt-4 bg-red-400 rounded flex justify-between ">
            <p className="weather-error-message text-xs bold leading-5">
                Oops! Something went wrong, please try again.
            </p>
            <button
                className="weather-error-button bg-red-600 text-white ml-2 p-1 rounded hover:bg-red-500"
                onClick={onReset}
            >
                <X size={12} />
            </button>
        </div>
    );
}
