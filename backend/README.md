# Ghost Fleet Dashboard - Backend Simulation

## Sprint 1 Implementation ✅

This backend implements the robotics simulation requirements from Sprint 1 of the MVP charter.

## Features

✅ **Foxglove WebSocket Server** (port 8765)  
✅ **Vector3 Location Channel** (`/location`) with x, y, z coordinates  
✅ **JSON Status Channel** (`/status`) with battery and state  
✅ **10Hz Publishing Rate** (100ms intervals)  
✅ **Circular Robot Movement** using sin/cos calculations  
✅ **Battery Simulation** (100% → 0% over 60 seconds, then reset)  
✅ **Console Logging** for operation verification  

## Setup & Installation

```bash
cd backend

# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

## Running the Simulation

```bash
# Activate virtual environment
source venv/bin/activate

# Run the simulation
python run_sim.py
```

**Expected Output:**
```
=== Ghost Fleet Dashboard - Backend Simulation ===
Starting Robot Fleet Simulation...
Press Ctrl+C to stop the simulation
==================================================
Starting Robot Fleet Simulation...
Foxglove WebSocket Server running on ws://localhost:8765
Created location channel: /location
Created status channel: /status
Simulation running - publishing telemetry at 10Hz (100ms intervals)
Publishing... Location: (100.0, 0.0), Battery: 100%, State: OPERATIONAL
Publishing... Location: (99.9, 3.1), Battery: 99%, State: OPERATIONAL
...
```

## Data Schemas

### Location Channel (`/location`)
```json
{
  "x": 100.0,
  "y": 15.2, 
  "z": 0.0
}
```

### Status Channel (`/status`) 
```json
{
  "battery": 85,
  "state": "OPERATIONAL"
}
```

## Simulation Behavior

- **Movement**: Robot follows circular path with 100px radius
- **Complete Circle**: Every 20 seconds
- **Battery Drain**: 60-second cycle (100% → 0% → reset)
- **Coordinate System**: Center at (0, 0), ground level z=0
- **Publishing Rate**: Exactly 10Hz (100ms intervals)

## Testing

Run the test script to verify functionality:
```bash
source venv/bin/activate
python test_sim.py
```

## Next Steps

Ready for Frontend Team integration:
- Connect to `ws://localhost:8765`
- Subscribe to `/location` and `/status` channels
- Verify 10Hz data reception in browser console