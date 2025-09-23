// src/components/AvatarUploader.jsx
import React, { useRef, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; // Assure-toi que le client Supabase est correctement configuré
import { useAuth } from '../context/AuthContext';

export default function AvatarUploader() {
  const { user } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState(null);
  const fileInputRef = useRef();

  useEffect(() => {
    if (user) fetchAvatar();
  }, [user]);

  // Récupère l'avatar depuis Supabase
  const fetchAvatar = async () => {
    try {
      const { data, error } = await supabase.storage
        .from('avatars')
        .download(`${user.id}.png`);
      if (error) throw error;

      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      console.log('Erreur fetch avatar:', error.message);
    }
  };

  // Upload fichier sur Supabase
  const uploadAvatar = async (file) => {
    try {
      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(`${user.id}.png`, file, { upsert: true });
      if (error) throw error;
      fetchAvatar(); // rafraîchit l'avatar
    } catch (error) {
      console.log('Erreur upload avatar:', error.message);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) uploadAvatar(file);
  };

  const handleClick = () => fileInputRef.current.click();

  return (
    <div className="flex items-center justify-center">
      {/* Cercle Avatar cliquable */}
      <div
        onClick={handleClick}
        className="w-12 h-12 rounded-full bg-gray-200 cursor-pointer flex items-center justify-center overflow-hidden border-2 border-gray-300"
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="avatar"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-500">+</span>
        )}
      </div>

      {/* Input file masqué */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
