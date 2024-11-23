const PRAYERS = {
  greek: 'αιη αιωι ηωιαη αη ιω ωη αιηουευωαι εαι υο ιαω ιωη οαυ αεη υωυω χαβραχ φλιεσ κηρφι νυρω φωχω βωχ',
  hebrew: 'הכפף לי כל הדיימונים, למען ישמעו לי כל דיימון, בין בשמים או ברוח או בארץ או מתחת לארץ או ביבשה או במים, וכל קסם ונגע אשר מאת האלוהים'
};

interface SpeechState {
  activeUtterances: SpeechSynthesisUtterance[];
  isMuted: boolean;
}

const speechState: SpeechState = {
  activeUtterances: [],
  isMuted: false
};

export function updateSpeechVolume(volume: number) {
  const isMuted = volume === 0;
  speechState.isMuted = isMuted;
  
  speechState.activeUtterances.forEach(utterance => {
    utterance.volume = isMuted ? 0 : 1;
  });
}

export async function recitePrayer(type: keyof typeof PRAYERS) {
  if ('speechSynthesis' in window) {
    // Wait for voices to be loaded
    if (speechSynthesis.getVoices().length === 0) {
      await new Promise<void>(resolve => {
        speechSynthesis.onvoiceschanged = () => resolve();
      });
    }
    
    const utterance = new SpeechSynthesisUtterance(PRAYERS[type]);
    utterance.lang = type === 'greek' ? 'el-GR' : 'he-IL';
    utterance.rate = 0.8;
    utterance.volume = speechState.isMuted ? 0 : 1;
    
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

    // Add volume change handler
    utterance.addEventListener('volumechange', () => {
      utterance.volume = speechState.isMuted ? 0 : 1;
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
