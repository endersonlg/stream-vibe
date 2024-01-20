import { Box } from '@/components/Box'
import { Carousel } from '@/components/Carousel'
import { CategoryCard } from '@/components/CategoryCard.'

// import avengers from '../assets/avengers.jpg'
// ,
export default function Home() {
  return (
    <main>
      <Carousel />
      <Box title="Movies">
        <CategoryCard />
      </Box>
    </main>
  )
}
