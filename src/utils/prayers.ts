const PRAYERS = {
  greek: 'αιη αιωι ηωιαη αη ιω ωη αιηουευωαι εαι υο ιαω ιωη οαυ αεη υωυω χαβραχ φλιεσ κηρφι νυρω φωχω βωχ',
  hebrew: 'הכפף לי כל הדיימונים, למען ישמעו לי כל דיימון, בין בשמים או ברוח או בארץ או מתחת לארץ או ביבשה או במים, וכל קסם ונגע אשר מאת האלוהים'
};

interface SpeechState {
  utterance: SpeechSynthesisUtterance | null;
  startVolume: number;
}

const speechState: SpeechState = {
  utterance: null,
  startVolume: 0.8
};

export function updateSpeechVolume(volume: number) {
  speechState.startVolume = volume;
  
  if (speechState.utterance && window.speechSynthesis.speaking) {
    // Update volume in real-time without recreating utterance
    speechState.utterance.volume = volume;
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
    utterance.volume = speechState.startVolume;
    
    // Try to find appropriate voice
    const voices = speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => voice.lang.startsWith(utterance.lang));
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    // Add volume change monitoring
    utterance.addEventListener('boundary', () => {
      if (utterance.volume !== speechState.startVolume) {
        utterance.volume = speechState.startVolume;
      }
    });
    
    speechState.utterance = utterance;
    window.speechSynthesis.speak(utterance);
    
    return new Promise<void>((resolve, reject) => {
      utterance.onend = () => {
        speechState.utterance = null;
        resolve();
      };
      
      utterance.onerror = (event: SpeechSynthesisErrorEvent) => {
        speechState.utterance = null;
        reject(new Error(`Speech synthesis failed: ${event.error}`));
      };
    });
  } else {
    console.warn('Speech synthesis not supported in this browser.');
    return Promise.resolve();
  }
}
