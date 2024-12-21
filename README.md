# Divine Oracle - Modern PGM Divination with Quantum Randomization

Divine Oracle is a modern web application that utilizes quantum randomization to deliver divinatory results based on ancient Greek and Kabbalistic prayers. Experience authentic, historically-informed divination with accessibility features designed for inclusivity.


![Divine Talisman](public/talisman.png)

## Features

### Supported Languages

*   Greek (el-GR): Ancient Greek incantations
*   Hebrew (he-IL): Kabbalistic prayers

### Fallback Handling

The application gracefully handles unsupported browsers, ensuring a basic level of functionality.

## Accessibility

### Screen Reader Support

*   Dynamic ARIA attributes manage loading states, providing clear feedback to screen reader users.
*   Oracle responses are optimized for screen readers, ensuring accurate and accessible interpretation.
*   Support for RTL/LTR text direction accommodates diverse language preferences.

### Keyboard Navigation

*   Full keyboard support for all interactive elements.
*   Seamless focus management throughout the oracle consultation process.
*   Clear loading state indicators via keyboard navigation.


## Deployment

### Environmental Requirements

*   Node.js 18.0.0+
*   Next.js 13.5+
*   Vercel hosting is recommended.  (Consider adding deployment instructions here)


## API Endpoints

The Divine Oracle utilizes a robust API for divination and data retrieval.

GET /api/random
  - Retrieves a random number using a quantum entropy source and atmospheric noise integration.
  - Range: \[0, n-1]  (Specify 'n' - the upper bound of the random number range)

POST /api/divination
  - Parameters:  language (el-GR or he-IL),  (Add other relevant parameters such as prayer type, user input, etc.)
  - Synthesizes an appropriate prayer based on the selected language and parameters.
  - Calculates the divination result based on the random number and prayer context.
  - Includes ritual timing information in the response. (Consider specifying response format - JSON?)



## Historical Context

### Papyri Graecae Magicae (PGM)

This project draws inspiration from the Papyri Graecae Magicae, a collection of ancient magical texts.

*   **Collection:** P.Bibl.Nat.suppl.gr. 574
*   **Date:** 3rd century CE
*   **Origin:** Thebes, Egypt
*   **First modern publication:** Preisendanz (1928)

### Ritual Authenticity

Divine Oracle strives for authenticity by:

*   Maintaining original Greek vowel sequences where applicable.
*   Preserving authentic divine names.
*   Implementing traditional timing mechanics.
*   Incorporating lunar phase calculations into the divination process.

## 📱 Progressive Web App Features
- Offline ritual capability
- PWA installation support
- Background prayer synthesis
- Local entropy collection
