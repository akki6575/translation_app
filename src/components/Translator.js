import React, { Component } from 'react';

const lang = {
    "am-ET": "Amharic",
    "ar-SA": "Arabic",
    "be-BY": "Bielarus",
    "bem-ZM": "Bemba",
    "bi-VU": "Bislama",
    "bjs-BB": "Bajan",
    "bn-IN": "Bengali",
    "bo-CN": "Tibetan",
    "br-FR": "Breton",
    "bs-BA": "Bosnian",
    "ca-ES": "Catalan",
    "cop-EG": "Coptic",
    "cs-CZ": "Czech",
    "cy-GB": "Welsh",
    "da-DK": "Danish",
    "dz-BT": "Dzongkha",
    "de-DE": "German",
    "dv-MV": "Maldivian",
    "el-GR": "Greek",
    "en-GB": "English",
    "es-ES": "Spanish",
    "et-EE": "Estonian",
    "eu-ES": "Basque",
    "fa-IR": "Persian",
    "fi-FI": "Finnish",
    "fn-FNG": "Fanagalo",
    "fo-FO": "Faroese",
    "fr-FR": "French",
    "gl-ES": "Galician",
    "gu-IN": "Gujarati",
    "ha-NE": "Hausa",
    "he-IL": "Hebrew",
    "hi-IN": "Hindi",
    "hr-HR": "Croatian",
    "hu-HU": "Hungarian",
    "id-ID": "Indonesian",
    "is-IS": "Icelandic",
    "it-IT": "Italian",
    "ja-JP": "Japanese",
    "kk-KZ": "Kazakh",
    "km-KM": "Khmer",
    "kn-IN": "Kannada",
    "ko-KR": "Korean",
    "ku-TR": "Kurdish",
    "ky-KG": "Kyrgyz",
    "la-VA": "Latin",
    "lo-LA": "Lao",
    "lv-LV": "Latvian",
    "men-SL": "Mende",
    "mg-MG": "Malagasy",
    "mi-NZ": "Maori",
    "ms-MY": "Malay",
    "mt-MT": "Maltese",
    "my-MM": "Burmese",
    "ne-NP": "Nepali",
    "niu-NU": "Niuean",
    "nl-NL": "Dutch",
    "no-NO": "Norwegian",
    "ny-MW": "Nyanja",
    "ur-PK": "Pakistani",
    "pau-PW": "Palauan",
    "pa-IN": "Panjabi",
    "ps-PK": "Pashto",
    "pis-SB": "Pijin",
    "pl-PL": "Polish",
    "pt-PT": "Portuguese",
    "rn-BI": "Kirundi",
    "ro-RO": "Romanian",
    "ru-RU": "Russian",
    "sg-CF": "Sango",
    "si-LK": "Sinhala",
    "sk-SK": "Slovak",
    "sm-WS": "Samoan",
    "sn-ZW": "Shona",
    "so-SO": "Somali",
    "sq-AL": "Albanian",
    "sr-RS": "Serbian",
    "sv-SE": "Swedish",
    "sw-SZ": "Swahili",
    "ta-LK": "Tamil",
    "te-IN": "Telugu",
    "tet-TL": "Tetum",
    "tg-TJ": "Tajik",
    "th-TH": "Thai",
    "ti-TI": "Tigrinya",
    "tk-TM": "Turkmen",
    "tl-PH": "Tagalog",
    "tn-BW": "Tswana",
    "to-TO": "Tongan",
    "tr-TR": "Turkish",
    "uk-UA": "Ukrainian",
    "uz-UZ": "Uzbek",
    "vi-VN": "Vietnamese",
    "wo-SN": "Wolof",
    "xh-ZA": "Xhosa",
    "yi-YD": "Yiddish",
    "zu-ZA": "Zulu"
}

class Translator extends Component {
  state = {
    fromText: '',
    toText: '',
    fromLanguage: 'en-GB',
    toLanguage: 'hi-IN',
    languages: {},
    loading: false
  };

  componentDidMount() {
    this.setState({ languages: lang });
  }

  copyContent = (text) => {
    navigator.clipboard.writeText(text);
  }

  utterText = (text, language) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    synth.speak(utterance);
  }

  handleExchange = () => {
    const { fromText, toText, fromLanguage, toLanguage } = this.state;
    this.setState({
      fromText: toText,
      toText: fromText,
      fromLanguage: toLanguage,
      toLanguage: fromLanguage
    });
  };

  handleTranslate = () => {
    const { fromText, fromLanguage, toLanguage } = this.state;
    this.setState({ loading: true });
    const url = `https://api.mymemory.translated.net/get?q=${fromText}&langpair=${fromLanguage}|${toLanguage}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          toText: data.responseData.translatedText,
          loading: false
        });
      });
  };

  handleIconClick = (target, id) => {
    const { fromText, toText, fromLanguage, toLanguage } = this.state;

    if (!fromText && !toText) return;

    if (target.classList.contains('fa-copy')) {
      if (id === 'from') {
        this.copyContent(fromText);
      } else {
        this.copyContent(toText);
      }
    } else if (target.classList.contains('fa-volume-high')) {
      if (id === 'from') {
        this.utterText(fromText, fromLanguage);
      } else {
        this.utterText(toText, toLanguage);
      }
    }
  };

  render() {
    const { fromText, toText, fromLanguage, toLanguage, languages, loading } = this.state;

    return (
      <>
        <div className="wrapper">
          <h1 className='heading'>Translating App</h1>
          <div className="text-input">
            <textarea
              name="from"
              className="from-text"
              placeholder="Enter Text"
              id="from"
              value={fromText}
              onChange={(e) => this.setState({ fromText: e.target.value })}
            ></textarea>
            <textarea
              name="to"
              className="to-text"
              id="to"
              value={toText}
              readOnly
            ></textarea>
          </div>
          <ul className="controls">
            <li className="row from">
              <div className="icons">
                <button
                  id="from"
                  onClick={() => this.utterText(fromText, fromLanguage)}
                >
                  Speak From Text
                </button>
                <button
                  id="from"
                  onClick={() => this.copyContent(fromText)}
                >
                  Copy From Text
                </button>
              </div>
              <select
                value={fromLanguage}
                onChange={(e) => this.setState({ fromLanguage: e.target.value })}
              >
                {Object.entries(languages).map(([code, name]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>
            </li>
            <li className="exchange" onClick={this.handleExchange}>
              <button>Swap</button>
            </li>
            <li className="row to">
              <select
                value={toLanguage}
                onChange={(e) => this.setState({ toLanguage: e.target.value })}
              >
                {Object.entries(languages).map(([code, name]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>
              <div className="icons">
                <button
                  id="to"
                  onClick={() => this.copyContent(toText)}
                >
                  Copy To Text
                </button>
                <button
                  id="to"
                  onClick={() => this.utterText(toText, toLanguage)}
                >
                  Speak Translated Text
                </button>
              </div>
            </li>
          </ul>
        </div>
        <button onClick={this.handleTranslate} disabled={loading}>
          {loading ? 'Translating...' : 'Translate Text'}
        </button>
      </>
    );
  }
}

export default Translator;
