'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Vector3, RobotStatus, RobotData, FoxgloveSubscribeMessage, FoxgloveMessageData } from '@/types/robot';
import { WEBSOCKET_CONFIG, TOPICS } from '@/config/websocket';
import { FoxgloveClient } from '@foxglove/ws-protocol';

export const useRobotData = () => {
  const [robotData, setRobotData] = useState<RobotData | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const clientRef = useRef<FoxgloveClient | null>(null);
  const locationDataRef = useRef<Vector3 | null>(null);
  const statusDataRef = useRef<RobotStatus | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const channelMapRef = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    const connect = () => {
      try {
        console.log('Attempting to connect to Foxglove WebSocket server...');
        
        const ws = new WebSocket(WEBSOCKET_CONFIG.URL, WEBSOCKET_CONFIG.PROTOCOL);
        const client = new FoxgloveClient({
          ws: ws,
        });

        client.on('open', () => {
          console.log('Connected to Foxglove WebSocket server');
          setIsConnected(true);
          setError(null);
          reconnectAttemptsRef.current = 0;
        });

        client.on('advertise', (channels) => {
          console.log('Channels advertised:', channels);
          
          // Build a map of topic to channel ID
          channels.forEach(channel => {
            channelMapRef.current.set(channel.topic, channel.id);
          });
          
          // Subscribe to location and status channels
          const locationChannelId = channelMapRef.current.get(TOPICS.LOCATION);
          const statusChannelId = channelMapRef.current.get(TOPICS.STATUS);
          
          if (locationChannelId !== undefined) {
            client.subscribe(locationChannelId);
            console.log(`Subscribed to ${TOPICS.LOCATION} channel (ID: ${locationChannelId})`);
          }
          
          if (statusChannelId !== undefined) {
            client.subscribe(statusChannelId);
            console.log(`Subscribed to ${TOPICS.STATUS} channel (ID: ${statusChannelId})`);
          }
        });

        client.on('message', ({ topic, data }) => {
          try {
            console.log('Received message:', { topic, data });
            
            if (topic === TOPICS.LOCATION) {
              locationDataRef.current = data as Vector3;
              console.log('Location data received:', data);
            } else if (topic === TOPICS.STATUS) {
              statusDataRef.current = data as RobotStatus;
              console.log('Status data received:', data);
            }
            
            // Combine data when both are available
            if (locationDataRef.current && statusDataRef.current) {
              setRobotData({
                location: locationDataRef.current,
                status: statusDataRef.current,
                timestamp: Date.now()
              });
            }
          } catch (err) {
            console.error('Error processing message:', err);
          }
        });

        client.on('error', (event) => {
          console.error('Foxglove client error:', event);
          setError('WebSocket connection error');
        });

        client.on('close', (event) => {
          console.log('Foxglove client connection closed:', event);
          setIsConnected(false);
          
          // Attempt to reconnect after delay if under max attempts
          if (reconnectAttemptsRef.current < WEBSOCKET_CONFIG.MAX_RECONNECT_ATTEMPTS) {
            reconnectAttemptsRef.current += 1;
            setTimeout(() => {
              if (clientRef.current === client) {
                connect();
              }
            }, WEBSOCKET_CONFIG.RECONNECT_DELAY);
          } else {
            setError('Maximum reconnection attempts reached');
          }
        });
        
        clientRef.current = client;
        
      } catch (err) {
        console.error('Error creating Foxglove client:', err);
        setError('Failed to create Foxglove client connection');
      }
    };

    connect();

    // Cleanup function
    return () => {
      if (clientRef.current) {
        clientRef.current.close();
        clientRef.current = null;
      }
    };
  }, []);

  return {
    robotData,
    isConnected,
    error
  };
};