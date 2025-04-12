import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function ChatBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, sender: 'user' }]);
    setInput('');

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { text: "Thanks for your message! We'll get back to you soon.", sender: 'bot' },
      ]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="relative">
        <button
          onClick={toggleChat}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="font-medium">Chat</span>
        </button>

        {isOpen && (
          <div className="absolute bottom-14 right-0 w-80 bg-white rounded-xl shadow-xl flex flex-col overflow-hidden">
            <div className="bg-indigo-600 text-white p-3 font-semibold flex items-center justify-between">
              <span>Live Chat</span>
              <button onClick={toggleChat}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 p-3 space-y-2 overflow-y-auto max-h-80">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-lg text-sm max-w-[80%] ${
                    msg.sender === 'user'
                      ? 'bg-indigo-100 ml-auto text-right'
                      : 'bg-gray-200 mr-auto text-left'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="p-2 border-t flex gap-2">
              <input
                type="text"
                className="flex-1 border rounded px-2 py-1 focus:outline-none"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
