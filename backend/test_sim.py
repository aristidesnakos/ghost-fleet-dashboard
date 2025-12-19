#!/usr/bin/env python3

import robot_sim
import time

def test_simulation():
    simulation = robot_sim.RobotSimulation()
    simulation.setup_channels()
    
    # Start server
    import foxglove
    simulation.server = foxglove.start_server(
        name="Robot Fleet Simulation", 
        host="0.0.0.0", 
        port=8765
    )
    
    print("Testing 5 cycles of telemetry publishing...")
    
    for i in range(5):
        print(f"\nCycle {i+1}:")
        simulation.publish_telemetry()
        time.sleep(0.1)
    
    print("\nTest completed successfully!")
    simulation.server.stop()

if __name__ == "__main__":
    test_simulation()