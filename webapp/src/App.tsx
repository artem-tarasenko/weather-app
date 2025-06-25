import Search from './components/Search';

export default function App() {
    return (
        <main className="weather-app min-h-screen flex flex-col items-center justify-center bg-indigo-400 p-4 w-full">
            <div className="app-header text-center mb-8 pt-8">
                <h1 className="app-title text-4xl md:text-5xl font-bold text-white mb-2">Weather App</h1>
                <p className="app-subtitle text-gray-100 ">Get real-time weather information for any city</p>
            </div>
            <Search />
        </main>
    );
}
