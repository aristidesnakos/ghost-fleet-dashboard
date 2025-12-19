#!/usr/bin/env python3

import robot_sim

if __name__ == "__main__":
    print("=== Ghost Fleet Dashboard - Backend Simulation ===")
    print("Starting Robot Fleet Simulation...")
    print("Press Ctrl+C to stop the simulation")
    print("=" * 50)
    
    simulation = robot_sim.RobotSimulation()
    simulation.run_simulation()