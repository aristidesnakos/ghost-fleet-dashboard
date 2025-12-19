'use client';

import { useRobotData } from '@/hooks/useRobotData';
import { ConnectionStatus } from '@/components/ConnectionStatus';
import { RobotTelemetry } from '@/components/RobotTelemetry';

export default function Home() {
  const { robotData, isConnected, error } = useRobotData();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <header>
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Ghost Fleet Dashboard
          </h1>
        </header>
        
        <main className="space-y-6">
          <ConnectionStatus isConnected={isConnected} error={error} />
          <RobotTelemetry robotData={robotData} isConnected={isConnected} />
        </main>
      </div>
    </div>
  );
}
