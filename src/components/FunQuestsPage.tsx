import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Fun Quests: stories of things Coro has done that sit outside film, acting and music.
 * Placeholder until Coro sends the stories. Add each quest to the list below.
 */
const quests: { title: string; story: string; image?: string }[] = [];

const FunQuestsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#fff4e0] text-[#3a2a1a]">
      <div className="max-w-4xl mx-auto px-6 sm:px-10 py-10">
        <Link to="/more" className="text-[11px] uppercase tracking-[0.25em] opacity-60 hover:opacity-100">
          ← More of me
        </Link>

        <h1 className="mt-16 font-handwritten text-7xl sm:text-9xl leading-none">Fun Quests</h1>
        <p className="mt-6 max-w-xl text-lg opacity-80">
          Stories of things I've done that have nothing to do with anything.
        </p>

        {quests.length === 0 ? (
          <p className="mt-24 font-handwritten text-4xl opacity-50">Stories coming soon…</p>
        ) : (
          <div className="mt-20 grid gap-16">
            {quests.map((q) => (
              <article key={q.title} className="grid sm:grid-cols-2 gap-8 items-center">
                {q.image && <img src={q.image} alt={q.title} className="w-full rotate-[-1.5deg] shadow-xl" />}
                <div>
                  <h2 className="font-handwritten text-5xl">{q.title}</h2>
                  <p className="mt-4 leading-relaxed">{q.story}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FunQuestsPage;
