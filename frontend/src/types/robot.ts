// Robot telemetry data types based on Foxglove protocol schemas

export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export interface RobotStatus {
  battery: number;
  state: "OPERATIONAL" | "ERROR";
}

export interface RobotData {
  location: Vector3;
  status: RobotStatus;
  timestamp: number;
}

// Foxglove WebSocket message types
export interface FoxgloveMessage {
  op: string;
  [key: string]: unknown;
}

export interface FoxgloveSubscription {
  id: number;
  topic: string;
}

export interface FoxgloveSubscribeMessage {
  op: 'subscribe';
  subscriptions: FoxgloveSubscription[];
}

export interface FoxgloveMessageData {
  op: 'messageData';
  topic: string;
  receiveTime: number;
  data: unknown;
}