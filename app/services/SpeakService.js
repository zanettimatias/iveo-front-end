import { TNSTextToSpeech } from "@nativescript-community/texttospeech";
let TTS = new TNSTextToSpeech();
let speakOptions = new SpeakOptions("");
TTS.speak(speakOptions);

import { SpeakOptions } from "~/services/SpeakOptions";

export class SpeakService {
  static speak(mensage) {
    return new Promise((resolve, reject) => {
      let speakOptions = new SpeakOptions(mensage);
      speakOptions.finishedCallback = resolve;
      TTS.speak(speakOptions);
    });
  }
  static personalityResponse(mensage) {
    return new Promise((resolve, reject) => {
      let speakOptions = new SpeakOptions(mensage);
      speakOptions.finishedCallback = resolve;
      TTS.speak(speakOptions);
    });
  }
}
