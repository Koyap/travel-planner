export type Recommendation = {
  id: string
  name: string
  category: string
  description: string
  rating: number
  priceRange: string
  emoji: string
  area: 'LA' | 'Las Vegas'
}

const DUMMY_RECOMMENDATIONS: Recommendation[] = [
  // --- Los Angeles ---
  {
    id: 'la-1',
    name: 'グリフィス天文台',
    category: 'アクティビティ',
    description: 'LAの街並みとハリウッドサインを一望できる丘の上の天文台。入場無料で夜景も絶景。映画「ラ・ラ・ランド」のロケ地としても有名。',
    rating: 4.7,
    priceRange: '無料',
    emoji: '🔭',
    area: 'LA',
  },
  {
    id: 'la-2',
    name: 'サンタモニカビーチ & ピア',
    category: 'アクティビティ',
    description: 'ルート66の終着点として有名なビーチと遊園地が併設された桟橋。サンセットタイムが特におすすめ。自転車レンタルでビーチ沿いを走れる。',
    rating: 4.5,
    priceRange: '無料〜',
    emoji: '🎡',
    area: 'LA',
  },
  {
    id: 'la-3',
    name: 'ゲッティセンター',
    category: 'アクティビティ',
    description: '無料で入れる世界トップクラスの美術館。印象派の絵画や彫刻を展示し、LA市街を見渡す庭園も見事。事前の駐車場予約が必要（入館無料）。',
    rating: 4.6,
    priceRange: '無料（駐車場$20）',
    emoji: '🎨',
    area: 'LA',
  },
  {
    id: 'la-4',
    name: 'グランドセントラルマーケット',
    category: 'グルメ',
    description: '1917年創業のダウンタウン最古のフードホール。タコス・ラーメン・ハンバーガーなど多国籍な屋台が集結。朝食から夜まで通年営業。',
    rating: 4.4,
    priceRange: '$10〜$25',
    emoji: '🌮',
    area: 'LA',
  },
  {
    id: 'la-5',
    name: 'ロデオドライブ',
    category: '散策',
    description: 'グッチ・シャネル・ルイヴィトンなどが軒を連ねるビバリーヒルズの高級ショッピングストリート。ウィンドウショッピングだけでも楽しめる。',
    rating: 4.3,
    priceRange: '無料〜',
    emoji: '👜',
    area: 'LA',
  },
  {
    id: 'la-6',
    name: 'ユニバーサルスタジオ・ハリウッド',
    category: 'アクティビティ',
    description: 'ハリーポッター・ミニオン・ジュラシックパークなどの人気アトラクションが揃う映画テーマパーク。バックロットツアーは必見。',
    rating: 4.5,
    priceRange: '$109〜',
    emoji: '🎬',
    area: 'LA',
  },
  // --- Las Vegas ---
  {
    id: 'lv-1',
    name: 'ザ・ストリップ夜景ウォーク',
    category: '散策',
    description: 'ベラージオ〜MGMグランドまで約6kmの大通りを歩く。ネオンサインと噴水ショーが煌めく夜のラスベガスを無料で満喫できる定番ルート。',
    rating: 4.8,
    priceRange: '無料',
    emoji: '🌃',
    area: 'Las Vegas',
  },
  {
    id: 'lv-2',
    name: 'ベラージオ噴水ショー',
    category: 'アクティビティ',
    description: '音楽に合わせて噴水が最大140m噴き上がる無料の噴水ショー。昼15分ごと・夜30分ごとに開催。夜のライトアップが特に幻想的。',
    rating: 4.8,
    priceRange: '無料',
    emoji: '⛲',
    area: 'Las Vegas',
  },
  {
    id: 'lv-3',
    name: 'フリーモントストリート・エクスペリエンス',
    category: 'アクティビティ',
    description: '長さ460mのアーチ型LEDスクリーンに映像が流れる無料のショー。ダウンタウンの老舗カジノが並ぶエリアで、ストリップとは異なるレトロな雰囲気。',
    rating: 4.5,
    priceRange: '無料',
    emoji: '💡',
    area: 'Las Vegas',
  },
  {
    id: 'lv-4',
    name: 'グランドキャニオン日帰りツアー',
    category: 'アクティビティ',
    description: 'ラスベガスから車で約4〜5時間。スカイウォークで有名なグランドキャニオン・ウエストや、サウスリム観光ツアーが多数催行されている。',
    rating: 4.9,
    priceRange: '$80〜$250（ツアー次第）',
    emoji: '🏜️',
    area: 'Las Vegas',
  },
  {
    id: 'lv-5',
    name: 'ブッフェ（MGMグランド / ウィン）',
    category: 'グルメ',
    description: 'ラスベガスの名物食文化であるホテルブッフェ。シーフード・寿司・デザートまで食べ放題。ウィンやアリアのブッフェは特にクオリティが高い。',
    rating: 4.3,
    priceRange: '$40〜$80',
    emoji: '🦞',
    area: 'Las Vegas',
  },
  {
    id: 'lv-6',
    name: 'シルク・ドゥ・ソレイユ「O」',
    category: 'アクティビティ',
    description: 'ベラージオで公演中の水上アクロバットショー。世界最高峰のパフォーマンスで、ラスベガス滞在中に1度は観る価値あり。要事前予約。',
    rating: 4.7,
    priceRange: '$100〜$200',
    emoji: '🎪',
    area: 'Las Vegas',
  },
]

export function getDummyRecommendations(): Recommendation[] {
  return DUMMY_RECOMMENDATIONS
}

// 将来のAPI連携用インターフェース
// Future: replace this with an actual API call
// async function fetchRecommendations(location: string): Promise<Recommendation[]> {
//   const res = await fetch(`/api/recommendations?location=${encodeURIComponent(location)}`)
//   return res.json()
// }
