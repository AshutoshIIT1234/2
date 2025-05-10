import { useState, useEffect } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useBedrockPassport } from '@bedrock_org/passport';

export function VirtualCompanion() {
  const [messages, setMessages] = useState<Array<{ text: string; sender: 'user' | 'ai' }>>([]);
  const [inputText, setInputText] = useState('');
  const { speak, speaking, cancel } = useSpeechSynthesis();
  const { isLoggedIn, user } = useBedrockPassport();
  
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      setInputText(transcript);
    }
  }, [transcript]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage = { text: inputText, sender: 'user' as const };
    setMessages(prev => [...prev, userMessage]);

    // TODO: Integrate with your LLM service here
    // For now, using a mock response
    const aiResponse = { 
      text: `Hello ${user?.name || 'there'}! I received your message: ${inputText}`, 
      sender: 'ai' as const 
    };

    setMessages(prev => [...prev, aiResponse]);
    speak({ text: aiResponse.text });
    setInputText('');
    resetTranscript();
  };

  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  if (!isLoggedIn) {
    return <div className="text-center p-4">Please log in to chat with your virtual companion</div>;
  }

  if (!browserSupportsSpeechRecognition) {
    return <div className="text-center p-4">Your browser doesn't support speech recognition.</div>;
  }

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto p-4">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg ${message.sender === 'user' ? 'bg-blue-100 ml-auto' : 'bg-gray-100'} max-w-[80%]`}
          >
            {message.text}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <button
          onClick={toggleListening}
          className={`p-2 rounded ${listening ? 'bg-red-500' : 'bg-blue-500'} text-white`}
        >
          {listening ? 'Stop' : 'Start'} Listening
        </button>
        {speaking && (
          <button
            onClick={cancel}
            className="p-2 rounded bg-red-500 text-white"
          >
            Stop Speaking
          </button>
        )}
      </div>

      <div className="flex gap-2 mt-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}