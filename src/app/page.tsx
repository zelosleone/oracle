'use client';

import Image from 'next/image';
import { useState } from 'react';
import { shuffleArray } from '@/utils/shuffle';
import { recitePrayer, updateSpeechVolume } from '@/utils/prayers';

export default function Home() {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    updateSpeechVolume(newMuted ? 0 : 1);
  };

  const revealAnswer = async () => {
    if (!question.trim()) {
      alert('Please enter a question');
      return;
    }
    const answerArray = answers.split('\n').filter(a => a.trim());
    if (answerArray.length < 2) {
      alert('Please enter at least two possible answers');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await recitePrayer('greek');
      await recitePrayer('hebrew');

      const max = answerArray.length - 1;
      const selectionResponse = await fetch(`/api/random?min=0&max=${max}`);

      if (!selectionResponse.ok) {
        throw new Error('Failed to fetch random number');
      }

      const selectionIndex = await selectionResponse.json();
      const shuffledAnswers = shuffleArray([...answerArray]);
      setResult(shuffledAnswers[selectionIndex]);
    } catch (error) {
      console.error('Error during revealAnswer:', error);
      setError('Failed to consult the Oracle. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-papyrus text-hieroglyph p-8">
      <main className="max-w-2xl mx-auto space-y-8">
        <div className="relative w-[100px] h-[100px] mx-auto">
          <Image 
            src="/talisman.png" 
            alt="Divine Oracle Talisman" 
            fill
            className="animate-float solar-glow object-contain"
          />
        </div>
        <h1 className="text-4xl text-center font-hieroglyph bg-clip-text text-transparent bg-gradient-to-r from-sacred to-celestial-dark drop-shadow-glow">
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
          {error && (
            <div className="text-red-500" role="alert">
              {error}
            </div>
          )}
        </div>

        {result && (
          <div className="divine-result">
            <h2 className="text-2xl mb-2 text-terracotta">The Oracle Speaks:</h2>
            <p className="text-xl select-text">{result}</p>
          </div>
        )}
      </main>
      <div className="fixed bottom-4 right-4 flex items-center gap-2 bg-scroll/80 p-2 rounded-lg">
        <button
          onClick={toggleMute}
          className="p-2 hover:opacity-80"
        >
          {isMuted ? '🔇' : '🔊'}
        </button>
      </div>
    </div>
  );
}
