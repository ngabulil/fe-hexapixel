import Profile from '@/containers/ProfileContainer/Profile'
import ProfileContextProvider from '@/contexts/ProfileContext'
import React from 'react'

const ProfilePage = () => {
  return (
    <ProfileContextProvider>
        <Profile />
    </ProfileContextProvider>
  )
}

export default ProfilePage