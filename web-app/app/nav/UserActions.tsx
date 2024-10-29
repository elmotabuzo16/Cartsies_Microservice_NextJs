'use client'

import { Button, Dropdown, DropdownDivider } from 'flowbite-react'
import { User } from 'next-auth'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { AiFillCar, AiFillTrophy, AiOutlineLogout } from 'react-icons/ai'
import { HiCog, HiUser } from 'react-icons/hi2'

type Props = {
  user: User
}

export default function UserActions({user}: Props) {
  const router = useRouter();

  return (
    <Dropdown inline label={`Welcome ${user.name}`}>
      <Dropdown.Item icon={HiUser}>
        <Link href='/'>
          My Auctions
        </Link>
      </Dropdown.Item>
      <Dropdown.Item icon={AiFillTrophy}>
        <Link href='/'>
          Auctions won
        </Link>
      </Dropdown.Item>

      <Dropdown.Item icon={AiFillCar}>
        <Link href='/'>
          Sell my car
        </Link>
      </Dropdown.Item>

      <Dropdown.Item icon={HiCog}>
        <Link href='/session'>
          Session (dev)
        </Link>
      </Dropdown.Item>

      <DropdownDivider />

      <Dropdown.Item icon={AiOutlineLogout}
        onClick={() => signOut({callbackUrl: '/'})}  
      >
        Signout
      </Dropdown.Item>

    </Dropdown>
  )
}
