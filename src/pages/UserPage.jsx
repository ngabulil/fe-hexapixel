import Users from '@/containers/OutcomeContainer copy/Users'
import UsersContextProvider from '@/contexts/UsersContext'
import React from 'react'

const UserPage = () => {
  return (
    <UsersContextProvider>
      <Users />
    </UsersContextProvider>
  )
}

export default UserPage