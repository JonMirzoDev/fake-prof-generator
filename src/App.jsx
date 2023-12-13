import React, { useState, useCallback, useEffect } from 'react'
import Papa from 'papaparse'
import Header from './components/Header'
import ProfilesDisplay from './components/ProfileDisplay'
import { generateProfiles, randomSeed } from './utils'
import InfiniteScroll from 'react-infinite-scroll-component'

function App() {
  const [country, setCountry] = useState('USA')
  const [errorRate, setErrorRate] = useState(0)
  const [seed, setSeed] = useState(randomSeed())
  const [profiles, setProfiles] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const fetchMoreProfiles = useCallback(() => {
    if (!hasMore) return

    const nextPage = page + 1
    const newProfiles = generateProfiles(country, errorRate, seed, nextPage)
    if (newProfiles.length === 0) {
      setHasMore(false)
    } else {
      setProfiles((prevProfiles) => [...prevProfiles, ...newProfiles])
      setPage(nextPage)
    }
  }, [country, errorRate, seed, page, hasMore])

  useEffect(() => {
    // Initial fetch for the first page
    const initialProfiles = generateProfiles(country, errorRate, seed, 1)
    setProfiles(initialProfiles)
  }, [country, errorRate, seed])

  function handleExport() {
    const csv = Papa.unparse(profiles)
    const csvData = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const csvURL = window.URL.createObjectURL(csvData)
    const tempLink = document.createElement('a')
    tempLink.href = csvURL
    tempLink.setAttribute('download', 'export.csv')
    tempLink.click()
  }

  return (
    <div className='text-center'>
      <nav className='mb-[70px]'>
        {' '}
        <Header
          setCountry={setCountry}
          setErrorRate={setErrorRate}
          setSeed={setSeed}
          seed={seed}
          errorRate={errorRate}
          handleExport={handleExport}
        />
      </nav>
      <InfiniteScroll
        dataLength={profiles.length}
        next={fetchMoreProfiles}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        scrollableTarget='scrollableDiv'
      >
        <ProfilesDisplay profiles={profiles} />
      </InfiniteScroll>
    </div>
  )
}

export default App
