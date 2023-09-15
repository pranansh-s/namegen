const speakText = (text, setIsSpeaking) => {
	if ('speechSynthesis' in window) {
		const synth = window.speechSynthesis;
		const utterance = new SpeechSynthesisUtterance(text);

		synth.speak(utterance);

		utterance.onstart = () => {
			setIsSpeaking(true);
		};

		utterance.onend = () => {
			setIsSpeaking(false);
		};
	} else {
		console.log('Speech synthesis is not supported in this browser.');
	}
};

export default speakText;
