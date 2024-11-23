const PRAYERS = {
  greek: 'αιη αιωι ηωιαη αη ιω ωη αιηουευωαι εαι υο ιαω ιωη οαυ αεη υωυω χαβραχ φλιεσ κηρφι νυρω φωχω βωχ',
  hebrew: 'הכפף לי כל הדיימונים, למען ישמעו לי כל דיימון, בין בשמים או ברוח או בארץ או מתחת לארץ או ביבשה או במים, וכל קסם ונגע אשר מאת האלוהים'
};

let currentUtterance: SpeechSynthesisUtterance | null = null;
let currentVolume = 0.8;
let currentResolve: (() => void) | null = null;

export function updateSpeechVolume(volume: number) {
  currentVolume = volume;
  if (currentUtterance) {
    // Stop current speech
    window.speechSynthesis.cancel();
    
    // Create new utterance with updated volume
    const newUtterance = new SpeechSynthesisUtterance(currentUtterance.text);
    newUtterance.lang = currentUtterance.lang;
    newUtterance.rate = currentUtterance.rate;
    newUtterance.volume = volume;
    newUtterance.voice = currentUtterance.voice;
    
    // Transfer the completion handlers
    newUtterance.onend = currentUtterance.onend;
    newUtterance.onerror = currentUtterance.onerror;
    
    // Replace current utterance
    currentUtterance = newUtterance;
    window.speechSynthesis.speak(newUtterance);
  }
}

export async function recitePrayer(type: keyof typeof PRAYERS) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    
    // Wait for voices to be loaded
    if (speechSynthesis.getVoices().length === 0) {
      await new Promise<void>(resolve => {
        speechSynthesis.onvoiceschanged = () => resolve();
      });
    }
    
    const utterance = new SpeechSynthesisUtterance(PRAYERS[type]);
    utterance.lang = type === 'greek' ? 'el-GR' : 'he-IL';
    utterance.rate = 0.8;
    utterance.volume = currentVolume;
    
    // Try to find appropriate voice
    const voices = speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => voice.lang.startsWith(utterance.lang));
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    currentUtterance = utterance;
    
    return new Promise<void>((resolve, reject) => {
      currentResolve = resolve;
      
      utterance.onend = () => {
        if (currentResolve === resolve) { // Only resolve if this is the final utterance
          currentUtterance = null;
          currentResolve = null;
          resolve();
        }
      };
      
      utterance.onerror = (event: SpeechSynthesisErrorEvent) => {
        currentUtterance = null;
        currentResolve = null;
        reject(new Error(`Speech synthesis failed: ${event.error}`));
      };
      
      window.speechSynthesis.speak(utterance);
    });
  } else {
    console.warn('Speech synthesis not supported in this browser.');
    return Promise.resolve();
  }
}
