import React, { useState } from 'react';
import {
  Youtube,
  Globe,
  Search,
  ExternalLink,
  Sparkles,
  PlayCircle,
  BookOpen,
  Award,
  Video,
} from 'lucide-react';
import { MEDIA_REFERENCES, PHYSICS_TOPICS } from '../data/physicsData';
import { MediaReference } from '../types';

export const ReferenceTab: React.FC = () => {
  const [searchTopic, setSearchTopic] = useState('');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('all');
  const [groundedResults, setGroundedResults] = useState<{ summary: string; links: { title: string; url: string }[] } | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const filterReferences = MEDIA_REFERENCES.filter((ref) => {
    const matchTopic = selectedTopicId === 'all' || ref.topicId === selectedTopicId;
    const matchSearch =
      ref.title.toLowerCase().includes(searchTopic.toLowerCase()) ||
      ref.description.toLowerCase().includes(searchTopic.toLowerCase()) ||
      ref.platform.toLowerCase().includes(searchTopic.toLowerCase());
    return matchTopic && matchSearch;
  });

  const runGroundedSearch = async () => {
    if (!searchTopic.trim()) return;

    setIsSearching(true);
    setGroundedResults(null);

    try {
      const response = await fetch('/api/search-references', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchTopic }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to fetch grounded references');
      }

      setGroundedResults({
        summary: data.summary,
        links: data.links || [],
      });
    } catch (err: any) {
      alert(`Search error: ${err.message}`);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 sm:p-8 text-white shadow-2xl border border-white/10 relative overflow-hidden">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-300 text-xs font-semibold">
            <Youtube className="w-3.5 h-3.5 text-rose-400" />
            <span>YouTube & Web Study Reference Finder</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            YouTube Video Tutorials & Online Physics References
          </h1>
          <p className="text-white/70 text-sm sm:text-base leading-relaxed">
            Find vetted YouTube video channels, interactive PhET simulations, HyperPhysics mind maps, and live lecture series to reinforce your Advanced Level Physics concepts.
          </p>
        </div>
      </div>

      {/* Grounded Search Bar */}
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 shadow-xl border border-white/10 space-y-3 text-white">
        <h3 className="text-sm font-bold text-white flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>AI Web & Video Reference Finder (Powered by Gemini Search Grounding)</span>
        </h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-white/40" />
            <input
              type="text"
              value={searchTopic}
              onChange={(e) => setSearchTopic(e.target.value)}
              placeholder="e.g. Vernier Caliper video demonstration, Resonance tube sound speed experiment, Doppler effect animations..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/20 focus:border-blue-500/50 text-sm text-white placeholder:text-white/30 outline-none"
            />
          </div>
          <button
            onClick={runGroundedSearch}
            disabled={isSearching || !searchTopic.trim()}
            className="px-6 py-2.5 rounded-xl bg-rose-600/80 hover:bg-rose-500 text-white font-bold border border-rose-400/30 text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-lg shadow-rose-500/20 transition-all disabled:opacity-50 shrink-0"
          >
            {isSearching ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Searching Web...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Find Videos & Web Links</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* AI Grounded Search Output */}
      {groundedResults && (
        <div className="bg-white/5 backdrop-blur-xl text-white rounded-2xl p-6 shadow-xl border border-white/10 space-y-4 animate-fadeIn">
          <div className="flex items-center space-x-2 border-b border-white/10 pb-3">
            <Sparkles className="w-5 h-5 text-amber-300" />
            <h3 className="text-base font-bold text-white">Gemini Grounded Search Results for "{searchTopic}"</h3>
          </div>

          <p className="text-xs sm:text-sm text-white/80 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/10">
            {groundedResults.summary}
          </p>

          {groundedResults.links && groundedResults.links.length > 0 && (
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400">Extracted Reference Links:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {groundedResults.links.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium text-rose-300 hover:text-white flex items-center justify-between transition-all border border-white/10"
                  >
                    <span className="truncate pr-2">{link.title}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Curated Channels & Web Portals */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white flex items-center space-x-2">
          <Award className="w-5 h-5 text-blue-400" />
          <span>Curated A/L Physics Video Channels & Portals</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filterReferences.map((item, idx) => {
            const ytQueryUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(item.searchQuery)}`;
            return (
              <div
                key={idx}
                className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 shadow-xl border border-white/10 space-y-3 flex flex-col justify-between hover:border-white/20 transition-all text-white"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                      {item.platform}
                    </span>
                    {item.badge && (
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-white">{item.title}</h4>
                  <p className="text-xs text-white/70 leading-relaxed">{item.description}</p>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
                  <a
                    href={item.type === 'video' ? ytQueryUrl : item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 font-bold text-xs transition-all"
                  >
                    {item.type === 'video' ? <PlayCircle className="w-3.5 h-3.5" /> : <Globe className="w-3.5 h-3.5" />}
                    <span>{item.type === 'video' ? 'Search YouTube' : 'Visit Web Site'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Search Topics by Curriculum */}
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/10 space-y-4 text-white">
        <h3 className="text-base font-bold text-white flex items-center space-x-2">
          <Video className="w-5 h-5 text-rose-400" />
          <span>Quick YouTube Search Topics by A/L Unit</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {PHYSICS_TOPICS.map((topic) => {
            const topicYtUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(`Advanced Level Physics ${topic.name} practicals animations tutorial`)}`;
            return (
              <a
                key={topic.id}
                href={topicYtUrl}
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-rose-400/40 transition-all flex items-center justify-between group"
              >
                <div>
                  <span className="text-[10px] font-bold text-white/40 block">{topic.code}</span>
                  <span className="text-xs font-bold text-white group-hover:text-rose-300">{topic.name}</span>
                </div>
                <Youtube className="w-4 h-4 text-white/40 group-hover:text-rose-400 transition-colors" />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
