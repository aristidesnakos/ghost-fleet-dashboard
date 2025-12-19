#!/usr/bin/env python3

import json
import math
import time
from typing import Dict, Any

import foxglove
from foxglove.channel import Channel


class RobotSimulation:
    def __init__(self):
        self.server = None
        self.location_channel = None
        self.status_channel = None
        
        # Simulation state
        self.time_start = time.time()
        self.battery = 100
        self.state = "OPERATIONAL"
        self.radius = 100  # Circular movement radius
        self.center_x = 0
        self.center_y = 0
        
    def setup_channels(self):
        # Vector3 schema for location
        vector3_schema = {
            "type": "object",
            "properties": {
                "x": {"type": "number"},
                "y": {"type": "number"}, 
                "z": {"type": "number"}
            }
        }
        
        # JSON schema for status
        status_schema = {
            "type": "object",
            "properties": {
                "battery": {"type": "integer", "minimum": 0, "maximum": 100},
                "state": {"type": "string", "enum": ["OPERATIONAL", "ERROR"]}
            }
        }
        
        # Create channels
        self.location_channel = Channel("/location", schema=vector3_schema, message_encoding="json")
        self.status_channel = Channel("/status", schema=status_schema, message_encoding="json")
        
        print(f"Created location channel: /location")
        print(f"Created status channel: /status")

    def calculate_position(self, elapsed_time: float) -> Dict[str, float]:
        # Circular movement using sin/cos calculations
        # Complete circle every 20 seconds (0.314 rad/s = 2π/20)
        angular_velocity = 2 * math.pi / 20  
        angle = angular_velocity * elapsed_time
        
        x = self.center_x + self.radius * math.cos(angle)
        y = self.center_y + self.radius * math.sin(angle)
        z = 0.0  # Ground level
        
        return {"x": x, "y": y, "z": z}
    
    def update_battery(self, elapsed_time: float):
        # Battery decrements each cycle, reset when reaching 0
        # Drain completely over 60 seconds, then reset
        cycle_time = 60.0
        battery_cycle_progress = (elapsed_time % cycle_time) / cycle_time
        self.battery = int(100 * (1 - battery_cycle_progress))
        
        if self.battery <= 0:
            self.battery = 100

    def publish_telemetry(self):
        elapsed_time = time.time() - self.time_start
        
        # Update simulation state
        position = self.calculate_position(elapsed_time)
        self.update_battery(elapsed_time)
        
        # Create telemetry messages
        location_msg = {
            "x": position["x"],
            "y": position["y"], 
            "z": position["z"]
        }
        
        status_msg = {
            "battery": self.battery,
            "state": self.state
        }
        
        # Publish to channels using foxglove.log
        foxglove.log("/location", location_msg)
        foxglove.log("/status", status_msg)
        
        # Console logging
        print(f"Publishing... Location: ({position['x']:.1f}, {position['y']:.1f}), Battery: {self.battery}%, State: {self.state}")

    def run_simulation(self):
        print("Starting Robot Fleet Simulation...")
        
        # Start foxglove server
        self.server = foxglove.start_server(
            name="Robot Fleet Simulation", 
            host="0.0.0.0", 
            port=8765
        )
        
        print("Foxglove WebSocket Server running on ws://localhost:8765")
        
        print("Simulation running - publishing telemetry at 10Hz (100ms intervals)")
        
        try:
            while True:
                self.publish_telemetry()
                time.sleep(0.1)  # 100ms = 10Hz
                
        except KeyboardInterrupt:
            print("\nShutting down simulation...")
        finally:
            if self.server:
                self.server.stop()


def main():
    simulation = RobotSimulation()
    simulation.run_simulation()


if __name__ == "__main__":
    main()