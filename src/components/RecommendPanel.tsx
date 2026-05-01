'use client'

import { useState } from 'react'
import { getDummyRecommendations, Recommendation } from '../utils/recommendDummy'

function RecommendCard({ rec }: { rec: Recommendation }) {
  return (
    <div className="bg-white rounded-xl border p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <div className="text-3xl">{rec.emoji}</div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-semibold text-gray-800">{rec.name}</h4>
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
              {rec.category}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1 leading-relaxed">{rec.description}</p>
          <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <span className="text-yellow-400">★</span>
              {rec.rating}
            </span>
            <span>{rec.priceRange}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

type Area = 'all' | 'LA' | 'Las Vegas'

export default function RecommendPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeArea, setActiveArea] = useState<Area>('all')

  const all = getDummyRecommendations()
  const filtered = activeArea === 'all' ? all : all.filter(r => r.area === activeArea)

  return (
    <div className="mt-8">
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="w-full bg-gradient-to-r from-blue-500 to-violet-500 text-white rounded-2xl p-4 flex items-center justify-between hover:from-blue-600 hover:to-violet-600 transition-all shadow-sm hover:shadow-md"
      >
        <div className="flex items-center gap-2">
          <span className="text-xl">✨</span>
          <span className="font-semibold">おすすめスポットを表示</span>
          <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">LA・ラスベガス</span>
        </div>
        <span className="text-lg">{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div className="mt-4">
          {/* エリアタブ */}
          <div className="flex gap-2 mb-4">
            {(['all', 'LA', 'Las Vegas'] as Area[]).map(area => (
              <button
                key={area}
                onClick={() => setActiveArea(area)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeArea === area
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border text-gray-600 hover:bg-gray-50'
                }`}
              >
                {area === 'all' ? 'すべて' : area}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filtered.map(rec => (
              <RecommendCard key={rec.id} rec={rec} />
            ))}
          </div>

          <p className="text-xs text-gray-400 mt-3 text-center">
            ※ サンプルデータを表示しています。将来的にAI・外部APIと連携予定です。
          </p>
        </div>
      )}
    </div>
  )
}
