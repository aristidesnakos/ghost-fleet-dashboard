interface ConnectionStatusProps {
  isConnected: boolean;
  error?: string | null;
}

export function ConnectionStatus({ isConnected, error }: ConnectionStatusProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">Connection Status</h2>
      <div className="flex items-center gap-2">
        <div 
          className={`w-3 h-3 rounded-full ${
            isConnected ? 'bg-green-500' : 'bg-red-500'
          }`}
          aria-label={isConnected ? 'Connected' : 'Disconnected'}
        />
        <span className={isConnected ? 'text-green-700' : 'text-red-700'}>
          {isConnected ? 'Connected' : 'Disconnected'}
        </span>
      </div>
      {error && (
        <div className="mt-2 text-red-600 text-sm" role="alert">
          Error: {error}
        </div>
      )}
    </div>
  );
}