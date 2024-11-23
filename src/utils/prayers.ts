const PRAYERS = {
  greek: 'αιη αιωι ηωιαη αη ιω ωη αιηουευωαι εαι υο ιαω ιωη οαυ αεη υωυω χαβραχ φλιεσ κηρφι νυρω φωχω βωχ',
  hebrew: 'הכפף לי כל הדיימונים, למען ישמעו לי כל דיימון, בין בשמים או ברוח או בארץ או מתחת לארץ או ביבשה או במים, וכל קסם ונגע אשר מאת האלוהים'
};

interface SpeechState {
  activeUtterances: SpeechSynthesisUtterance[];
  startVolume: number;
}

const speechState: SpeechState = {
  activeUtterances: [],
  startVolume: 0.8
};

export function updateSpeechVolume(volume: number) {
  speechState.startVolume = volume;
  
  // Update all active utterances immediately
  speechState.activeUtterances.forEach(utterance => {
    // Direct volume manipulation
    utterance.volume = volume;
    
    // Ensure the change takes effect
    const event = new Event('volumechange');
    utterance.dispatchEvent(event);
  });
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
    utterance.volume = speechState.startVolume;
    
    // Try to find appropriate voice
    const voices = speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => voice.lang.startsWith(utterance.lang));
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    // Track this utterance
    speechState.activeUtterances.push(utterance);
    
    // Add volume control listeners
    utterance.addEventListener('start', () => {
      if (!speechState.activeUtterances.includes(utterance)) {
        speechState.activeUtterances.push(utterance);
      }
    });
    
    utterance.addEventListener('end', () => {
      const index = speechState.activeUtterances.indexOf(utterance);
      if (index > -1) {
        speechState.activeUtterances.splice(index, 1);
      }
    });
    
    utterance.addEventListener('error', () => {
      const index = speechState.activeUtterances.indexOf(utterance);
      if (index > -1) {
        speechState.activeUtterances.splice(index, 1);
      }
    });
    
    window.speechSynthesis.speak(utterance);
    
    return new Promise<void>((resolve, reject) => {
      utterance.onend = () => {
        resolve();
      };
      
      utterance.onerror = (event: SpeechSynthesisErrorEvent) => {
        reject(new Error(`Speech synthesis failed: ${event.error}`));
      };
    });
  } else {
    console.warn('Speech synthesis not supported in this browser.');
    return Promise.resolve();
  }
}
