/* eslint-disable no-console */
/* eslint-disable no-alert */
import React, { FC, useEffect, useState } from 'react'

const IndexDbPage: FC = () => {
  const [version, setVersion] = useState(1)
  const [title, setTitle] = useState('notes')

  let db: IDBDatabase

  const createDB = () => {
    if (typeof document === 'undefined') return
    const dbName = (document.getElementById('txtDB') as HTMLInputElement)?.value
    const dbVersion = (
      document.getElementById('txtVersion') as HTMLInputElement
    )?.value

    const request = indexedDB.open(dbName, Number(dbVersion))

    request.onupgradeneeded = e => {
      db = e.target?.['result']
      // const notes = {
      //   title: 'note1',
      //   text: 'this is a note',
      // }

      const pNotes = db.createObjectStore('personal_notes', {
        keyPath: 'title',
      })
      const todoNotes = db.createObjectStore('todo_notes', {
        keyPath: 'title',
      })
      alert(`upgrade is called database name ${db.name} version ${db.version}`)
    }

    request.onsuccess = e => {
      db = e.target?.['result']
      alert(`success is called database name ${db.name} version ${db.version}`)
    }

    request.onerror = (e: Event) => {
      console.log(e?.target?.['error']?.message)
      alert(`error is called: ${e?.target?.['error']?.message}`)
    }
  }

  function addNote() {
    const note = {
      title: 'note2',
      text: 'This is my note baby',
    }

    const tx = db?.transaction('personal_notes', 'readwrite')
    // tx.onerror! = (e: Event) => alert(`Error ${e.target?.['error']}`)
    const pNotes = tx?.objectStore('personal_notes')
    pNotes?.add(note)
  }

  function viewNotes() {
    const tx = db?.transaction('personal_notes', 'readonly')
    const pNotes = tx?.objectStore('personal_notes')
    const request = pNotes?.openCursor()
    request.onsuccess = e => {
      const cursor = e.target?.['result']
      if (cursor) {
        alert(`Note: Title: ${cursor.key} Text: ${cursor.value.text}`)
        cursor.continue()
      }
    }
  }

  useEffect(() => {
    const btnCreateDB = document.getElementById('btnCreateDB')
    const btnAddNote = document.getElementById('btnAddNote')
    const btnViewNote = document.getElementById('btnViewNotes')

    btnCreateDB?.addEventListener('click', createDB)
    btnAddNote?.addEventListener('click', addNote)
    btnViewNote?.addEventListener('click', viewNotes)
  }, [])

  return (
    <div>
      DB
      <input
        type="text"
        value={title}
        id="txtDB"
        onChange={e => setTitle(e.target.value)}
      />
      Version{' '}
      <input
        type="number"
        value={version}
        id="txtVersion"
        onChange={e => {
          setVersion(Number(e?.target?.value))
        }}
      />
      <button id="btnCreateDB">Create DB</button>
      <br />
      <button id="btnAddNote">Add Note</button>
      <br />
      <button id="btnViewNotes">View Note</button>
    </div>
  )
}

export default IndexDbPage
