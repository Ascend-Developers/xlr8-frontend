/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react'
import Lottie from 'lottie-react'
import animationData from 'assets/json/tickAnimation.json'
import crossAnimationData from 'assets/json/crossAnimation.json'
import loadingAnimationData from 'assets/json/loading.json'
import './EventsAttended.scss'
import { showUser } from 'containers/users/Api'
import { useParams } from 'react-router-dom'

function EventsAttendedPage() {
  const { id } = useParams()
  const [approved, setApproved] = useState('')
  const [user, setUser] = useState()
  const fetchUserStatus = async () => {
    const result = await showUser(id)
    if (result?.status === 200) {
      if (result?.User?.status) {
        setApproved(result.User.status.toLowerCase())
        setUser(result.User)
      }
    }
  }
  useEffect(() => {
    if (id) {
      fetchUserStatus()
    }
    setApproved(false)
  }, [id])
  return (
    <div className='center-container'>
      <p className='heading-h5'>
        {!approved
          ? 'Loading'
          : approved === 'approved'
            ? 'Approved'
            : 'Not Approved'}
      </p>
      <Lottie
        animationData={
          !approved
            ? loadingAnimationData
            : approved === 'approved'
              ? animationData
              : crossAnimationData
        }
        loop
        autoplay
        className='custom-lottie' // Apply your CSS class
      />
      {approved && (
        <>
          <p>
            <b>Name: </b> {user?.name}
          </p>
          <p>
            <b>Email: </b> {user?.email}
          </p>
        </>
      )}
    </div>
  )
}

export default EventsAttendedPage
