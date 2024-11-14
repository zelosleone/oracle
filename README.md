# Oracle - Quantum-Enhanced Decision Engine

A stochastic decision-making system implementing quantum mechanical principles, wave function transformations, and true random number generation through an interactive web interface.

## Mathematical Foundation

### Core Quantum Wave Function
The system implements a modified Schrödinger wave equation:
Ψ(x,t) = A·exp(i(kx - ωt))
Where:
- Ψ(x,t): Wave function in space-time
- A: Amplitude coefficient
- k: Wave number vector
- ω: Angular frequency
- i: Imaginary unit (√-1)

### Statistical Implementation

#### Probability Distribution
The system utilizes Shannon entropy for distribution analysis:
H = -Σ p(x)log₂(p(x))

#### Quantum Energy Calculations
Energy values computed through:
E = Σ(Si · φ · sin(θi) · Ψi) / n
Where:
- Si: Pentagram side lengths
- φ: Golden ratio (1.618033988749895)
- θi: Vertex angles (2π/5)
- Ψi: Wave component
- n: Normalization factor

## Technical Architecture

### Random Number Generation
- Implementation: Random.org API HTTP/JSON-RPC
- Distribution: Non-linear probability mapping
- Quantum seed modification using wave function collapse

### Complexity Analysis
- Time Complexity: O(n·log n) for shuffling operations
- Space Complexity: O(n) for answer storage
- Quantum Computation Overhead: O(m·k)
  - m = iteration count
  - k = complexity factor

### Canvas Implementation
- Resolution: 400x400px with HiDPI scaling
- Touch events: Custom coordinate transformation
- Drawing Context: 2D with anti-aliasing

## API Integration

### Random.org Endpoint Schema
```javascript
POST https://api.random.org/json-rpc/4/invoke
Content-Type: application/json
{
    "method": "generateIntegers",
    "params": {
        "n": count,
        "min": min,
        "max": max,
        "replacement": true
    }
}

## Error Handling
- Exponential backoff for API failures
- Quantum decoherence compensation
- Entropy pool depletion protection
