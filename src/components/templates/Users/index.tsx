'use client'
/* eslint-disable no-console */

import React, { Suspense } from 'react'
import axios from 'axios'

const fetchUser = () => {
  return axios
    .get('https://jsonplaceholder.typicode.com/users/1')
    .then(res => res.data)
    .catch(err => console.log(err))
}

const fetchPosts = () => {
  return axios
    .get('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.data)
    .catch(err => console.log(err))
}

const wrapPromise = promise => {
  // set initial status
  let status = 'pending'
  let result
  const suspender = promise.then(
    res => {
      status = 'success'
      result = res
    },
    err => {
      ;(status = 'error'), (result = err)
    },
  )
  return {
    read() {
      if (status) {
        if (status === 'pending') {
          throw suspender
        } else if (status === 'error') {
          throw result
        } else if (status === 'success') {
          return result
        }
      }
    },
  }
}

const fetchData = () => {
  const userPromise = fetchUser()
  const postsPromise = fetchPosts()
  return {
    user: wrapPromise(userPromise),
    posts: wrapPromise(postsPromise),
  }
}

const resource = fetchData()

const ProfileDetails = () => {
  const user = resource.user.read()
  return (
    <div className="card">
      <h1 className="text-lg text-black"> {user.name}</h1>
      <ul>
        <li>Username: {user.username}</li>
        <li>Email: {user.email}</li>
        <li>City: {user.address.city}</li>
      </ul>
    </div>
  )
}

const ProfilePosts = () => {
  const posts = resource.posts.read()

  return (
    <ul className="list-item">
      <li className="list-inside">
        <strong>Latest Post</strong>
      </li>
      {posts.map(post => (
        <li className="list-disc" key={post.id}>
          {post.title}
        </li>
      ))}
    </ul>
  )
}

const Users = () => {
  return (
    <div>
      <Suspense fallback={<h1>Loading users...</h1>}>
        <ProfileDetails />
      </Suspense>
      <Suspense fallback={<h1>Loading posts...</h1>}>
        <ProfilePosts />
      </Suspense>
    </div>
  )
}

export { Users }
