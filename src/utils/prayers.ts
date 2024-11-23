const PRAYERS = {
  greek: 'αιη αιωι ηωιαη αη ιω ωη αιηουευωαι εαι υο ιαω ιωη οαυ αεη υωυω χαβραχ φλιεσ κηρφι νυρω φωχω βωχ',
  hebrew: 'הכפף לי כל הדיימונים, למען ישמעו לי כל דיימון, בין בשמים או ברוח או בארץ או מתחת לארץ או ביבשה או במים, וכל קסם ונגע אשר מאת האלוהים'
};

let currentUtterance: SpeechSynthesisUtterance | null = null;
let currentVolume = 0.8;

export function updateSpeechVolume(volume: number) {
  currentVolume = volume;
  if (currentUtterance) {
    currentUtterance.volume = volume;
    
    // Force the speech synthesis to recognize the volume change
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      window.speechSynthesis.resume();
    }
  }
}

export async function recitePrayer(type: keyof typeof PRAYERS) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(PRAYERS[type]);
    utterance.lang = type === 'greek' ? 'el-GR' : 'he-IL';
    utterance.rate = 0.8;
    utterance.volume = currentVolume;
    
    currentUtterance = utterance;
    
    window.speechSynthesis.speak(utterance);
    
    return new Promise((resolve, reject) => {
      utterance.onend = () => {
        currentUtterance = null;
        resolve(undefined);
      };
      utterance.onerror = (e) => {
        currentUtterance = null;
        reject(e);
      };
    });
  } else {
    console.warn('Speech synthesis not supported in this browser.');
    return Promise.resolve();
  }
}
