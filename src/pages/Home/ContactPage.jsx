// src/pages/Home/ContactPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../../supabaseClient';
import { v4 as uuidv4 } from 'uuid';
import Picker from '@emoji-mart/react';
import emojiData from '@emoji-mart/data';

export default function ContactPage() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [user, setUser] = useState(null);
  const [userAvatar, setUserAvatar] = useState(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Récupérer utilisateur
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setUser(data.session.user);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) setUser(session.user);
        else setUser(null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  // Charger messages + Realtime
  useEffect(() => {
    fetchMessages();

    const subscription = supabase
      .channel('messages_channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          const newMsg = payload.new;
          setMessages((prev) => {
            if (prev.some((m) => m.id === newMsg.id)) return prev;
            return [...prev, newMsg];
          });
        }
      )
      .subscribe();

    return () => supabase.removeChannel(subscription);
  }, []);

  // Scroll automatique
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('id, content, user_id, avatar_url, created_at')
      .order('created_at', { ascending: true });
    if (!error && data) setMessages(data);
  };

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    const tempId = uuidv4();
    const tempMessage = {
      id: tempId,
      content: newMessage,
      user_id: user?.id || undefined,
      created_at: new Date().toISOString(),
      pending: true,
      avatar_url: userAvatar || undefined,
    };

    setMessages((prev) => [...prev, tempMessage]);
    setNewMessage('');

    try {
      const { data, error } = await supabase.from('messages').insert([
        {
          content: tempMessage.content,
          user_id: tempMessage.user_id,
          avatar_url: tempMessage.avatar_url,
          created_at: tempMessage.created_at,
        },
      ]);

      if (error) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === tempId ? { ...msg, error: true, pending: false } : msg
          )
        );
      } else if (data && data.length > 0) {
        setMessages((prev) =>
          prev.map((msg) => (msg.id === tempId ? data[0] : msg))
        );
      }
    } catch (err) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === tempId ? { ...msg, error: true, pending: false } : msg
        )
      );
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleAvatarUpload = async (e) => {
    if (!user || !e.target.files.length) return;
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(fileName, file, { upsert: true });

    if (!uploadError) {
      const {
        data: { publicUrl },
      } = supabase.storage.from('avatars').getPublicUrl(fileName);
      setUserAvatar(publicUrl);

      setMessages((prev) =>
        prev.map((msg) =>
          msg.user_id === user.id ? { ...msg, avatar_url: publicUrl } : msg
        )
      );
    }
  };

  const getAvatarElement = (avatar_url, userId) => {
    if (avatar_url) {
      return (
        <img
          src={avatar_url}
          alt="avatar"
          className="w-8 h-8 rounded-full object-cover"
        />
      );
    }
    const colors = ['#FFB6C1', '#87CEFA', '#90EE90', '#FFA07A', '#9370DB'];
    const color = colors[userId?.charCodeAt(0) % colors.length] || '#ccc';
    return (
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
        style={{ backgroundColor: color }}
      >
        {userId?.[0]?.toUpperCase() || 'A'}
      </div>
    );
  };

  const handleSelectEmoji = (emoji) => {
    setNewMessage((prev) => prev + emoji.native);
    setShowEmoji(false);
    textareaRef.current.focus();
  };

  // --- UI Messenger-like ---
  return (
    <div className="flex flex-col h-screen items-center justify-center bg-gradient-to-b from-purple-800 to-indigo-900">
      <div className="flex flex-col w-[80%] h-[80%] bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Barre du haut */}
        <div className="flex items-center justify-between px-4 py-3 bg-purple-900 text-white">
          <button className="text-lg">⬅️</button>
          <h2 className="font-bold">Contact</h2>
          <div className="flex space-x-4">
            <button onClick={() => window.open('tel:+21612345678')}>📞</button>
            <button
              onClick={() =>
                window.open('https://wa.me/21612345678?call', '_blank')
              }
            >
              🎥
            </button>
            <button onClick={() => alert('Infos du contact')}>ℹ️</button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
          {messages.map((msg) => {
            const isUser = msg.user_id === user?.id;
            return (
              <div
                key={msg.id}
                className={`flex items-end ${
                  isUser ? 'justify-end' : 'justify-start'
                }`}
              >
                {!isUser && (
                  <div className="mr-2">
                    {getAvatarElement(msg.avatar_url, msg.user_id)}
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-xs shadow ${
                    isUser
                      ? 'bg-blue-500 text-white rounded-br-none'
                      : 'bg-gray-200 text-gray-800 rounded-bl-none'
                  } ${msg.pending ? 'italic opacity-70' : ''} ${
                    msg.error ? 'bg-red-200 text-red-800' : ''
                  }`}
                >
                  <div>{msg.content}</div>
                  <div className="text-[10px] text-gray-500 mt-1 text-right">
                    {new Date(msg.created_at).toLocaleTimeString()}
                    {msg.pending && ' (Envoi...)'}
                    {msg.error && ' (Erreur)'}
                  </div>
                </div>
                {isUser && (
                  <div className="ml-2">
                    {getAvatarElement(userAvatar, user?.id)}
                  </div>
                )}
              </div>
            );
          })}
          <div ref={messagesEndRef}></div>
        </div>

        {/* Barre de saisie */}
        <div className="flex flex-col p-2 bg-white border-t relative">
          {showEmoji && (
            <div
              className="absolute bottom-16 left-2 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <Picker data={emojiData} onEmojiSelect={handleSelectEmoji} />
            </div>
          )}

          <div className="flex items-center space-x-2">
            <label>
              ➕
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
            </label>
            <button onClick={() => textareaRef.current.focus()}>📷</button>
            <button onClick={() => setShowEmoji((prev) => !prev)}>😊</button>
            <textarea
              ref={textareaRef}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Écrire un message..."
              rows={1}
              className="flex-1 px-4 py-2 border rounded-full resize-none"
            />
            <button
              onClick={handleSend}
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
            >
              ➤
            </button>
          </div>

          {/* Partage */}
          <div className="flex justify-around bg-purple-900 text-white py-2 mt-2 rounded-b-lg">
            <button
              onClick={() =>
                window.open(
                  'https://wa.me/?text=Hello depuis Messenger Clone',
                  '_blank'
                )
              }
            >
              WhatsApp
            </button>
            <button
              onClick={() =>
                window.open(
                  'https://t.me/share/url?url=https://zaad-altaalib.com&text=Partage test',
                  '_blank'
                )
              }
            >
              Telegram
            </button>
            <button
              onClick={() =>
                window.open(
                  'mailto:test@example.com?subject=Partage&body=Message depuis app',
                  '_blank'
                )
              }
            >
              Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
