// Header.js
import React from 'react'
import { Button, IconButton, Option, Select } from '@material-tailwind/react'
import { randomSeed } from '../../utils'

export default function Header({
  setCountry,
  setErrorRate,
  setSeed,
  handleExport,
  seed,
  errorRate
}) {
  const handleCountryChange = (value) => {
    setCountry(value)
  }

  const handleSliderChange = (event) => {
    setErrorRate(Number(event.target.value))
  }

  const handleSeedChange = (event) => {
    setSeed(Number(event.target.value))
  }

  const generateRandomSeed = () => {
    const newSeed = randomSeed()
    setSeed(newSeed)
  }

  return (
    <header className='bg-white shadow-md p-4 fixed top-0 left-0 right-0 z-10 flex items-center justify-around h-[64px]'>
      {/* Country Selector */}
      <div className='flex items-center gap-2'>
        <span className='font-semibold'>Region:</span>
        <Select
          defaultValue='Poland'
          variant='outlined'
          onChange={handleCountryChange}
        >
          <Option value='USA'>USA</Option>
          <Option value='France'>France</Option>
          <Option value='Germany'>Germany</Option>
        </Select>
      </div>

      {/* Error Slider */}
      <div className='flex items-center gap-2'>
        <span className='font-semibold'>Errors:</span>
        <input
          type='range'
          min='0'
          max='10'
          value={errorRate}
          step='1'
          onChange={handleSliderChange}
        />
        <input
          type='text'
          size='sm'
          value={errorRate}
          onChange={handleSliderChange}
          className='w-[30px] text-center border-[1px] rounded-[4px] border-[#333]'
        />
      </div>

      {/* Seed Input */}
      <div className='flex items-center gap-2'>
        <span className='font-semibold'>Seed:</span>
        <input
          type='text'
          color='lightBlue'
          size='sm'
          outline={true}
          placeholder='Seed'
          value={seed}
          onChange={handleSeedChange}
          className='w-[90px] text-center border-[1px] rounded-[4px] border-[#333]'
        />
        <IconButton
          onClick={generateRandomSeed}
          size='sm'
          className='w-[25px] h-[25px]'
        >
          <i className='fas fa-sync-alt text-[16px] mt-[2.4px]' />
        </IconButton>
      </div>

      {/* Export Button */}
      <Button
        color='lightBlue'
        buttonType='filled'
        size='sm'
        ripple='light'
        onClick={handleExport}
      >
        Export
      </Button>
    </header>
  )
}
