'use client'

import { useEffect, useState } from 'react';
import { supabase } from '@/app/supabaseClient';

export default function ChatPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    fetchMessages();

    const channel = supabase.channel('public:messages')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
        setMessages((prev) => [...prev, payload.new]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchMessages = async () => {
    const { data } = await supabase.from('messages').select('*').order('created_at');
    setMessages(data || []);
  };

  const sendMessage = async () => {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user || !newMessage.trim()) return;
    await supabase.from('messages').insert({ content: newMessage, sender_id: user.id });
    setNewMessage('');
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl mb-4">Chat Room</h1>
      <div className="border p-4 h-96 overflow-y-scroll mb-4 bg-sky-700">
        {messages.map((msg) => (
          <div key={msg.id} className="mb-2">
            <strong>{msg.sender_id}</strong>: {msg.content}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input className="input flex-1" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message..." />
        <button className="btn" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
