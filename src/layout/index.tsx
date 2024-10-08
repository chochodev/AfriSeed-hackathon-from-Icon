import Navbar from './navbar'
import { ReactNode } from 'react'

interface MainLayoutProps {
  children: ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className='size-full'>
      <Navbar />

      {/* ::::::::::::::::: child prop */}
      <main className='size-full'>
      {children}
      </main>

      {/* <Footer /> */}
    </div>
  )
}

export default MainLayout