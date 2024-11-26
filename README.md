# Divine Oracle - Modern PGM Divination with Quantum Randomization

A web-based divination system combining the Papyri Graecae Magicae (PGM) with quantum randomization, implementing the Stele of Jeu (PGM V. 96-172).

![Divine Talisman](public/talisman.png)

## 🌟 Key Features

- **Real-Time Fortune Telling**: Make decisions and seek guidance instantly.
- **Quantum Randomization**: Utilizes atmospheric noise from Random.org for true randomness.
- **Multi-Language Prayers**: Supports Greek and Hebrew mystical prayers.
- **Accessible Design**: Mobile-responsive and optimized for all users.
- **Voice Synthesis**: Authentic prayer recitation using the Web Speech API.

## 🔮 Mystical Implementation

### Ancient Sources
- **Primary Text**: PGM V. 96-172 (Stele of Jeu/Headless Ritual)
- **Collection**: P.Bibl.Nat.suppl.gr. 574, Thebes, Egypt (3rd century CE)
- **Modern Sources**:
  - Crowley's Liber Samekh
  - Golden Dawn's Bornless Ritual
  - Preisendanz's 1928 publication

### Ritual Components
- Greek voces magicae (ιαω, αβραξας)
- Hebrew divine names (אהיה אשר אהיה)
- Quantum-enhanced randomization
- Traditional timing mechanics

## 📡 Technical Architecture

### Core Stack
- **Frontend**: Next.js 15.0.3 with React Server Components
- **Language**: TypeScript 5.x
- **Styling**: TailwindCSS with custom Geist fonts
- **Speech Synthesis**: Web Speech API integration

### Randomization System
- **Primary Entropy Source**: Quantum-based atmospheric noise from Random.org
- **Secondary Entropy**: Fisher-Yates shuffle implementation
- **Entropy Formula**: `P(oracle_response) = 1/n! * quantum_coefficient`

### Voice Synthesis
- **Languages Supported**:
  - Ancient Greek (el-GR)
  - Biblical Hebrew (he-IL)
  - Barbarous Names pronunciation
- **Features**:
  - Automatic voice selection based on language
  - Volume control and mute functionality

## 🚀 Quick Start

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

## 📡 API Endpoints
```typescript
GET /api/random
  - Quantum entropy source
  - Atmospheric noise integration
  - Range: [0, n-1]

POST /api/divination
  - Prayer synthesis
  - Result calculation
  - Ritual timing
```

## 📚 Historical Context

### Papyri Graecae Magicae
- Collection: P.Bibl.Nat.suppl.gr. 574
- Date: 3rd century CE
- Origin: Thebes, Egypt
- First modern publication: Preisendanz (1928)

### Ritual Authenticity
- Maintains original Greek vowel sequences
- Preserves authentic divine names
- Implements traditional timing mechanics
- Incorporates lunar phase calculations

## 📱 Progressive Web App Features
- Offline ritual capability
- PWA installation support
- Background prayer synthesis
- Local entropy collection
