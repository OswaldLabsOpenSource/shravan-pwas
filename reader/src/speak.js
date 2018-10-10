export default text => {
	const synthesis = window.speechSynthesis;
	const utterance = new SpeechSynthesisUtterance(text);
	synthesis.speak(utterance);
	console.log('speaking', text);
}