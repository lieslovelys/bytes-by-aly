export interface AchievementItem {
  id: string
  rank: string
  title: string
  subtitle?: string
  full: string
}

export const achievementsList: AchievementItem[] = [
  {
    id: 'binance-top10',
    rank: 'TOP 10 FINALIST',
    title: 'BCC x Binance Academy',
    subtitle: 'Build4Campus Hackathon',
    full: 'Top 10 Finalist – BCC x Binance Academy: Build4Campus Hackathon',
  },
  {
    id: 'urstamp-1st',
    rank: '1ST PLACE',
    title: 'System Making · URStamp 2026',
    full: 'System Making 1st place – URStamp (2026)',
  },
]

export const academicAchievement: string = 'System Making 1st place – URStamp (2026)'

