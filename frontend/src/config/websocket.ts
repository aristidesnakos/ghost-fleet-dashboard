// WebSocket configuration
export const WEBSOCKET_CONFIG = {
  URL: process.env.NEXT_PUBLIC_WEBSOCKET_URL || 'ws://localhost:8765',
  RECONNECT_DELAY: 2000,
  PROTOCOL: 'foxglove.websocket.v1',
  MAX_RECONNECT_ATTEMPTS: 5,
} as const;

// Subscription topics
export const TOPICS = {
  LOCATION: '/location',
  STATUS: '/status',
} as const;