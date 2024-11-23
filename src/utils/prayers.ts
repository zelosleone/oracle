const PRAYERS = {
  greek: 'αιη αιωι ηωιαη αη ιω ωη αιηουευωαι εαι υο ιαω ιωη οαυ αεη υωυω χαβραχ φλιεσ κηρφι νυρω φωχω βωχ',
  hebrew: 'הכפף לי כל הדיימונים, למען ישמעו לי כל דיימון, בין בשמים או ברוח או בארץ או מתחת לארץ או ביבשה או במים, וכל קסם ונגע אשר מאת האלוהים'
};

export async function recitePrayer(type: keyof typeof PRAYERS, volume: number = 0.8) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(PRAYERS[type]);
    utterance.lang = type === 'greek' ? 'el-GR' : 'he-IL';
    utterance.rate = 0.8;
    utterance.volume = volume;
    window.speechSynthesis.speak(utterance);
    
    return new Promise((resolve, reject) => {
      utterance.onend = resolve;
      utterance.onerror = reject;
    });
  } else {
    console.warn('Speech synthesis not supported in this browser.');
    return Promise.resolve();
  }
}
