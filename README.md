# Divine Oracle

## Mathematical Implementation

### Randomization Algorithm

The oracle uses a dual-source entropy system for decision making:

1. **Primary Entropy Source**: True random numbers from Random.org's atmospheric noise
   - Quantum randomization via `/api/random` endpoint
   - Range: [0, n-1] where n = number of possible answers
   - Entropy source: atmospheric noise

2. **Secondary Entropy (Fallback)**: Fisher-Yates shuffle implementation
   ```typescript
   P(permutation) = 1/n!
   where n = array.length
   ```

### Probability Distribution

For n possible answers:
- Initial probability per answer: P(x) = 1/n
- Post-shuffle entropy: H = -∑(p_i * log₂(p_i)) = log₂(n!
- Uniform distribution maintained through bijective mapping

## Cryptographic Considerations

### Entropy Sources
1. Random.org API: ~7-8 bits of entropy per request
2. Fallback PRNG: Math.random() (~32 bits)

### Security Boundaries
- Non-predictable outcome: O(n!) possible permutations
- Timing attacks mitigated via Promise.all() implementation
- Network failure graceful degradation to PRNG

## Implementation Details

### Speech Synthesis

- Dual-language prayer system using Web Speech API
- Language configurations:
  - Greek (el-GR): Ancient Greek incantations
  - Hebrew (he-IL): Kabbalistic prayers
- Fallback handling for non-supporting browsers

### Accessibility Features

#### ARIA Attributes
- Dynamic state management for loading states
- Screen reader optimizations for oracle responses
- RTL/LTR text direction support for prayers

#### Keyboard Navigation
- Full keyboard support for all interactive elements
- Focus management during oracle consultation
- Loading state indicators

## Deployment

### Environmental Requirements
- Node.js 18.0.0+
- Next.js 13.5+
- Vercel hosting recommended
