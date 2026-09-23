import Hero from '../components/Hero'
import LogoWall from '../components/LogoWall'
import FlowSection from '../components/FlowSection'
import PromptBuilder from '../components/PromptBuilder'
import Features from '../components/Features'
import Reps from '../components/Reps'
import Customers from '../components/Customers'
import Updates from '../components/Updates'

export default function Home() {
  return (
    <>
      <Hero />
      <LogoWall />
      <FlowSection />
      <PromptBuilder />
      <Features />
      <Reps />
      <Customers />
      <Updates />
    </>
  )
}
