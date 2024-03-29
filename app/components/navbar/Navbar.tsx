'use client'

import { Container } from '../Container'
import { Categories } from './Categories'
import { Logo } from './Logo'
import { Search } from './Search'

export const Navbar = () => {
  return (
    <div className="fixed z-10 w-full bg-white shadow-sm">
      <div className="border-b-[1px] py-4">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <div></div>
            {/* <UserMenu currentUser={currentUser} /> */}
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  )
}
