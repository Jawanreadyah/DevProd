import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, getDocs, doc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { formatDistanceToNow } from 'date-fns';
import { Image as ImageIcon, Send, LogIn } from 'lucide-react';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';

interface Post {
  id: string;
  content: string;
  imageUrl?: string;
  createdAt: any;
  authorUid: string;
}

export function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user && user.email === 'ajidev6@gmail.com') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    });

    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsubscribePosts = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Post));
      setPosts(postsData);
    }, (error) => {
      console.error("Error fetching posts:", error);
    });

    return () => {
      unsubscribeAuth();
      unsubscribePosts();
    };
  }, []);

  useEffect(() => {
    let mCount = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'm' || e.key === 'M') {
        mCount++;
        if (mCount === 10) {
          if (isAdmin) {
            setNotification("Already in admin mode");
          } else {
            setShowPasswordModal(true);
          }
          setTimeout(() => setNotification(null), 3000);
          mCount = 0;
        }
      } else {
        mCount = 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAdmin]);

  const handlePasswordSubmit = () => {
    if (passwordInput === "Devang@123") {
      setIsAdmin(true);
      setShowPasswordModal(false);
      setPasswordInput('');
      setNotification("Admin mode activated");
    } else {
      alert("Incorrect password");
    }
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="w-full h-full">
      {notification && (
        <div className="fixed top-4 right-4 bg-black text-white px-4 py-2 rounded-lg shadow-lg z-50">
          {notification}
        </div>
      )}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col gap-4">
            <h3 className="font-bold text-lg">Enter Admin Password</h3>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Password"
              className="px-4 py-2 border rounded-xl outline-none"
            />
            <div className="flex gap-2">
              <button onClick={() => setShowPasswordModal(false)} className="px-4 py-2 rounded-xl bg-gray-200">Cancel</button>
              <button onClick={handlePasswordSubmit} className="px-4 py-2 rounded-xl bg-black text-white">Submit</button>
            </div>
          </div>
        </div>
      )}

      <p className="text-gray-600 text-xs mb-2 px-2">Some Photos(idk what to put here lol)</p>
      <div className="relative w-full h-full overflow-hidden">
        <div className="grid grid-cols-2 gap-1 animate-marquee-vertical">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-full h-[300px] rounded-2xl overflow-hidden shadow-sm">
              <img 
                src={`https://picsum.photos/seed/henry-danger-${i}/400/600`}
                alt="Henry Danger" 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
          {[...Array(12)].map((_, i) => (
            <div key={`dup-${i}`} className="w-full h-[300px] rounded-2xl overflow-hidden shadow-sm">
              <img 
                src={`https://picsum.photos/seed/henry-danger-${i}/400/600`}
                alt="Henry Danger" 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes marquee-vertical {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .animate-marquee-vertical {
          animation: marquee-vertical 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
