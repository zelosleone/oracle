'use client';

import { useState } from 'react';
import { shuffleArray } from '@/utils/shuffle';
import { recitePrayer } from '@/utils/prayers';

export default function Home() {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const revealAnswer = async () => {
    setLoading(true);
    try {
      // Recite prayers before randomization
      await recitePrayer('greek');
      await recitePrayer('hebrew');

      const answerArray = answers.split('\n').filter(a => a.trim());
      if (answerArray.length === 0) {
        alert('Please enter at least one answer');
        return;
      }
      
      // Get two random numbers from Random.org
      const max = answerArray.length - 1;
      const [shuffleResponse, selectionResponse] = await Promise.all([
        fetch(`/api/random?min=0&max=${max}`),
        fetch(`/api/random?min=0&max=${max}`)
      ]);
      
      const [shuffleSeed, selectionIndex] = await Promise.all([
        shuffleResponse.json(),
        selectionResponse.json()
      ]);
      
      // Shuffle answers using Fisher-Yates with Random.org seed
      const shuffledAnswers = shuffleArray([...answerArray], shuffleSeed);
      
      // Use second random number for final selection
      const selectedIndex = selectionIndex;
      setResult(shuffledAnswers[selectedIndex]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-papyrus text-hieroglyph p-8">
      <main className="max-w-2xl mx-auto space-y-8">
        {/* Logo image - aspect ratio 4.74:1 */}
        <img 
          src="/talisman.png" 
          alt="Divine Oracle Talisman" 
          width={100} 
          height={100} 
          className="mx-auto animate-float solar-glow"
          style={{ height: 'auto' }}
        />
        <h1 className="text-4xl text-center font-hieroglyph bg-clip-text text-transparent bg-gradient-to-r from-gold-dark to-gold">
          Divine Oracle
        </h1>
        
        <div className="space-y-4 text-center mystical-text">
          <p className="text-celestial-dark text-sm font-hieroglyph prayer-greek" dir="ltr">
            αιη αιωι ηωιαη αη ιω ωη αιηουευωαι εαι υο ιαω ιωη οαυ αεη υωυω χαβραχ φλιεσ κηρφι νυρω φωχω βωχ
          </p>
          <p className="text-sacred text-sm font-hieroglyph prayer-hebrew" dir="rtl">
            הכפף לי כל הדיימונים, למען ישמעו לי כל דיימון, בין בשמים או ברוח או בארץ או מתחת לארץ או ביבשה או במים, וכל קסם ונגע אשר מאת האלוהים
          </p>
        </div>
        
        <div className="space-y-4 relative">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask your question..."
            className="w-full p-4 mystic-input"
            disabled={loading}
          />
          
          <textarea
            value={answers}
            onChange={(e) => setAnswers(e.target.value)}
            placeholder="Enter possible answers (one per line)..."
            className="w-full h-48 p-4 mystic-input"
            disabled={loading}
          />
          
          <button
            onClick={revealAnswer}
            disabled={loading}
            className="w-full p-4 oracle-button"
          >
            {loading ? 'Consulting the Oracle...' : 'Reveal Me The Truth'}
          </button>
        </div>

        {result && (
          <div className="divine-result">
            <h2 className="text-2xl mb-2 text-terracotta">The Oracle Speaks:</h2>
            <p className="text-xl">{result}</p>
          </div>
        )}
      </main>
    </div>
  );
}