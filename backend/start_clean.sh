#!/bin/bash

# Ghost Fleet Dashboard - Clean Startup Script
# Kills any existing processes on port 8765 and starts the simulation

echo "=== Ghost Fleet Dashboard - Clean Startup ==="
echo "Checking for existing processes on port 8765..."

# Check if anything is running on port 8765
EXISTING_PID=$(lsof -ti:8765 2>/dev/null)

if [ ! -z "$EXISTING_PID" ]; then
    echo "Found process(es) on port 8765: $EXISTING_PID"
    echo "Killing existing process(es)..."
    
    # Kill the process(es)
    echo "$EXISTING_PID" | xargs kill -9 2>/dev/null
    
    # Wait a moment for cleanup
    sleep 2
    
    # Verify the port is free
    REMAINING=$(lsof -ti:8765 2>/dev/null)
    if [ -z "$REMAINING" ]; then
        echo "Port 8765 is now free."
    else
        echo "Warning: Some processes may still be running on port 8765"
        echo "Remaining PIDs: $REMAINING"
    fi
else
    echo "Port 8765 is already free."
fi

echo ""
echo "Starting Robot Fleet Simulation..."
echo "Press Ctrl+C to stop the simulation"
echo "=================================================="

# Start the simulation
python run_sim.py