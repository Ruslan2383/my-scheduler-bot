import cron from 'cron'
import { prisma } from '../src/lib/prisma'
import { updatePostStatus } from '../src/services/post.service'

const scheduler = new cron.CronJob('*/30 * * * *', async () => { // Каждые 30 мин
  const now = new Date()
  
  const scheduledPosts = await prisma.post.findMany({
    where: {
      status: 'SCHEDULED',
      scheduledAt: { lte: now }
    }
  })

  for (const post of scheduledPosts) {
    try {
      // TODO: Отправка в Twitter/Telegram
      console.log(`Publishing post ${post.id}`)
      
      await updatePostStatus(post.id, 'PUBLISHED', now)
    } catch (error) {
      await updatePostStatus(post.id, 'FAILED')
    }
  }
})

scheduler.start()
console.log('🕐 Scheduler started')
