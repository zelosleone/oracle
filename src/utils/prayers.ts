const PRAYERS = {
    greek: 'αιη αιωι ηωιαη αη ιω ωη αιηουευωαι εαι υο ιαω ιωη οαυ αεη υωυω χαβραχ φλιεσ κηρφι νυρω φωχω βωχ',
    hebrew: 'הכפף לי כל הדיימונים, למען ישמעו לי כל דיימון, בין בשמים או ברוח או בארץ או מתחת לארץ או ביבשה או במים, וכל קסם ונגע אשר מאת האלוהים'
  };
  
  export async function recitePrayer(type: keyof typeof PRAYERS) {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(PRAYERS[type]);
      utterance.lang = type === 'greek' ? 'el-GR' : 'he-IL';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
      
      return new Promise(resolve => {
        utterance.onend = resolve;
      });
    }
    return Promise.resolve();
  }