import { RobotData } from '@/types/robot';

interface RobotTelemetryProps {
  robotData: RobotData | null;
  isConnected: boolean;
}

interface DataCardProps {
  label: string;
  value: string | number;
  className?: string;
}

function DataCard({ label, value, className = '' }: DataCardProps) {
  return (
    <div className={`bg-gray-50 p-3 rounded ${className}`}>
      <span className="font-medium">{label}:</span> {value}
    </div>
  );
}

interface StatusBadgeProps {
  state: 'OPERATIONAL' | 'ERROR';
}

function StatusBadge({ state }: StatusBadgeProps) {
  const isOperational = state === 'OPERATIONAL';
  return (
    <span 
      className={`ml-2 px-2 py-1 rounded text-xs ${
        isOperational 
          ? 'bg-green-100 text-green-800' 
          : 'bg-red-100 text-red-800'
      }`}
      aria-label={`Robot state: ${state}`}
    >
      {state}
    </span>
  );
}

export function RobotTelemetry({ robotData, isConnected }: RobotTelemetryProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Robot Telemetry</h2>
      
      {robotData ? (
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Location</h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <DataCard label="X" value={robotData.location.x.toFixed(2)} />
              <DataCard label="Y" value={robotData.location.y.toFixed(2)} />
              <DataCard label="Z" value={robotData.location.z.toFixed(2)} />
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Status</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <DataCard label="Battery" value={`${robotData.status.battery}%`} />
              <div className="bg-gray-50 p-3 rounded">
                <span className="font-medium">State:</span>
                <StatusBadge state={robotData.status.state} />
              </div>
            </div>
          </div>
          
          <div className="text-xs text-gray-500">
            Last updated: {new Date(robotData.timestamp).toLocaleTimeString()}
          </div>
        </div>
      ) : (
        <div className="text-gray-500 text-center py-8">
          {isConnected ? 'Waiting for robot data...' : 'Not connected to robot telemetry'}
        </div>
      )}
    </div>
  );
}