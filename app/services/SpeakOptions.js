export class SpeakOptions {
  text = "";
  speakRate = 0.54;
  pitch = 1.0;
  volume = 1.0;
  locale = "es-MX";
  finishedCallback = Function;

  constructor(text, func) {
    this.text = text;
    this.finishedCallback = func;
  }
}
