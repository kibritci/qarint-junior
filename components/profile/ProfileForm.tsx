'use client';

import { useState, useEffect } from 'react';
import { updateProfile } from '@/actions/gamification';
import { ACCENT_COLORS } from '@/lib/constants/avatar';
import { createClient } from '@/lib/supabase/client';

interface ProfileFormProps {
  initialDisplayName: string;
  initialAccentColor: string | null;
  totalXp: number;
  currentStreak: number;
}

export default function ProfileForm({
  initialDisplayName,
  initialAccentColor,
  totalXp,
  currentStreak,
}: ProfileFormProps) {
  const [displayName, setDisplayName] = useState(initialDisplayName);
  const [accentColor, setAccentColor] = useState<string | null>(initialAccentColor ?? 'primary');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#password') {
      document.getElementById('password')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    const result = await updateProfile({
      display_name: displayName.trim() || null,
      accent_color: accentColor,
    });
    setSaving(false);
    if (result.error) {
      setMessage({ type: 'error', text: result.error });
    } else {
      setMessage({ type: 'success', text: 'Profile saved!' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="card-game p-4">
          <p className="text-2xl font-display font-bold text-gray-900">{totalXp}</p>
          <p className="text-xs text-gray-500">Total XP</p>
        </div>
        <div className="card-game p-4">
          <p className="text-2xl font-display font-bold text-gray-900">{currentStreak}</p>
          <p className="text-xs text-gray-500">Day Streak</p>
        </div>
      </div>

      {/* Display name */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
          Display name
        </label>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Your name"
          maxLength={30}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm
                     placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40"
        />
      </div>

      {/* Accent color */}
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Accent color
        </label>
        <div className="flex flex-wrap gap-2">
          {ACCENT_COLORS.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setAccentColor(c.id)}
              title={c.label}
              className={`w-9 h-9 rounded-full ${c.bg} transition-all
                ${accentColor === c.id ? 'ring-2 ring-offset-2 ' + c.ring : 'opacity-80 hover:opacity-100'}`}
            />
          ))}
        </div>
      </div>

      {message && (
        <div
          className={`p-3 rounded-xl text-sm font-medium
            ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}
        >
          {message.text}
        </div>
      )}

      <button
        type="button"
        onClick={handleSave}
        disabled={saving}
        className="w-full btn-primary py-3.5 text-sm disabled:opacity-50"
      >
        {saving ? 'Saving...' : 'Save profile'}
      </button>

      {/* Change password */}
      <section id="password" className="pt-8 border-t border-gray-200">
        <h2 className="text-lg font-display font-bold text-gray-900 mb-2">Change password</h2>
        <p className="text-sm text-gray-500 mb-4">
          Set a new password for your account. You will stay signed in.
        </p>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              New password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              minLength={6}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm
                         placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Confirm new password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              minLength={6}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm
                         placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          {passwordMessage && (
            <div
              className={`p-3 rounded-xl text-sm font-medium
                ${passwordMessage.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}
            >
              {passwordMessage.text}
            </div>
          )}
          <button
            type="button"
            onClick={async () => {
              if (newPassword.length < 6) {
                setPasswordMessage({ type: 'error', text: 'Password must be at least 6 characters.' });
                return;
              }
              if (newPassword !== confirmPassword) {
                setPasswordMessage({ type: 'error', text: 'Passwords do not match.' });
                return;
              }
              setPasswordSaving(true);
              setPasswordMessage(null);
              const supabase = createClient();
              const { error } = await supabase.auth.updateUser({ password: newPassword });
              setPasswordSaving(false);
              if (error) {
                setPasswordMessage({ type: 'error', text: error.message });
              } else {
                setPasswordMessage({ type: 'success', text: 'Password updated.' });
                setNewPassword('');
                setConfirmPassword('');
              }
            }}
            disabled={passwordSaving || !newPassword || !confirmPassword}
            className="w-full py-3 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700
                       hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {passwordSaving ? 'Updating...' : 'Update password'}
          </button>
        </div>
      </section>
    </div>
  );
}
