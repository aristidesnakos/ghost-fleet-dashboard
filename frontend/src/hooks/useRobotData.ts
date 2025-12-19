'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Vector3, RobotStatus, RobotData, FoxgloveSubscribeMessage, FoxgloveMessageData } from '@/types/robot';
import { WEBSOCKET_CONFIG, TOPICS } from '@/config/websocket';

// Helper function to parse message data from various formats
const parseMessageData = (data: unknown): unknown => {
  if (typeof data === 'string') {
    // If data is a string, parse it as JSON
    return JSON.parse(data);
  } else if (data instanceof ArrayBuffer || data instanceof Uint8Array) {
    // If data is binary, decode and parse
    return JSON.parse(new TextDecoder().decode(data));
  } else {
    // If data is already an object
    return data;
  }
};

export const useRobotData = () => {
  const [robotData, setRobotData] = useState<RobotData | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const wsRef = useRef<WebSocket | null>(null);
  const locationDataRef = useRef<Vector3 | null>(null);
  const statusDataRef = useRef<RobotStatus | null>(null);
  const reconnectAttemptsRef = useRef(0);

  useEffect(() => {
    const connect = () => {
      try {
        console.log('Attempting to connect to Foxglove WebSocket server...');
        const ws = new WebSocket(WEBSOCKET_CONFIG.URL, [WEBSOCKET_CONFIG.PROTOCOL]);
        
        ws.onopen = () => {
          console.log('Connected to Foxglove WebSocket server');
          setIsConnected(true);
          setError(null);
          reconnectAttemptsRef.current = 0;
          
          // Subscribe to channels after connection
          const subscribeMessage: FoxgloveSubscribeMessage = {
            op: 'subscribe',
            subscriptions: [
              {
                id: 1,
                topic: TOPICS.LOCATION
              },
              {
                id: 2,
                topic: TOPICS.STATUS
              }
            ]
          };
          
          ws.send(JSON.stringify(subscribeMessage));
          console.log('Subscribed to /location and /status channels');
        };
        
        ws.onmessage = (event) => {
          try {
            const message = JSON.parse(event.data) as { op: string; [key: string]: unknown };
            console.log('Received message:', message);
            
            // Handle different message types from Foxglove protocol
            if (message.op === 'messageData') {
              const messageData = message as FoxgloveMessageData;
              const { topic, data } = messageData;
              
              const parsedData = parseMessageData(data);
              
              if (topic === TOPICS.LOCATION) {
                locationDataRef.current = parsedData as Vector3;
                console.log('Location data received:', parsedData);
              } else if (topic === TOPICS.STATUS) {
                statusDataRef.current = parsedData as RobotStatus;
                console.log('Status data received:', parsedData);
              }
              
              // Combine data when both are available
              if (locationDataRef.current && statusDataRef.current) {
                setRobotData({
                  location: locationDataRef.current,
                  status: statusDataRef.current,
                  timestamp: Date.now()
                });
              }
            } else if (message.op === 'advertise') {
              console.log('Channel advertised:', message);
            } else if (message.op === 'unadvertise') {
              console.log('Channel unadvertised:', message);
            } else {
              console.log('Unknown message type:', message.op);
            }
          } catch (err) {
            console.error('Error parsing message:', err, event.data);
          }
        };
        
        ws.onerror = (event) => {
          console.error('WebSocket error:', event);
          setError('WebSocket connection error');
        };
        
        ws.onclose = (event) => {
          console.log('WebSocket connection closed:', event.code, event.reason);
          setIsConnected(false);
          
          // Attempt to reconnect after delay if under max attempts
          if (reconnectAttemptsRef.current < WEBSOCKET_CONFIG.MAX_RECONNECT_ATTEMPTS) {
            reconnectAttemptsRef.current += 1;
            setTimeout(() => {
              if (wsRef.current === ws) {
                connect();
              }
            }, WEBSOCKET_CONFIG.RECONNECT_DELAY);
          } else {
            setError('Maximum reconnection attempts reached');
          }
        };
        
        wsRef.current = ws;
        
      } catch (err) {
        console.error('Error creating WebSocket connection:', err);
        setError('Failed to create WebSocket connection');
      }
    };

    connect();

    // Cleanup function
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, []);

  return {
    robotData,
    isConnected,
    error
  };
};