import { allFakers } from '@faker-js/faker'
import Chance from 'chance'

// Helper function to introduce errors into the data
function introduceErrors(text, errorRate) {
  const chance = new Chance()
  let newText = text
  for (let i = 0; i < errorRate; i++) {
    if (chance.bool()) {
      // Randomly delete character
      if (newText.length > 1) {
        const index = chance.integer({ min: 0, max: newText.length - 1 })
        newText = newText.slice(0, index) + newText.slice(index + 1)
      }
    } else if (chance.bool()) {
      // Randomly add character
      const randomChar = chance.character()
      const index = chance.integer({ min: 0, max: newText.length })
      newText = newText.slice(0, index) + randomChar + newText.slice(index)
    } else {
      // Randomly swap characters
      if (newText.length > 1) {
        const index = chance.integer({ min: 0, max: newText.length - 2 })
        newText =
          newText.slice(0, index) +
          newText.charAt(index + 1) +
          newText.charAt(index) +
          newText.slice(index + 2)
      }
    }
  }
  return newText
}

export function generateProfiles(
  country,
  errorRate,
  seed,
  page,
  initialPageSize = 20,
  subsequentPageSize = 10
) {
  const localeMap = {
    USA: 'en_US',
    France: 'fr',
    Germany: 'de'
  }

  const localeCode = localeMap[country] || 'en_US'
  const faker = allFakers[localeCode]
  faker.seed(seed)

  const phoneNumberFormatMap = {
    USA: '###-###-####',
    France: '0# ## ## ## ##',
    Germany: '0### ######'
  }

  const phoneNumberFormat = phoneNumberFormatMap[country] || '###-###-####'

  const pageSize = page === 1 ? initialPageSize : subsequentPageSize
  const startIndex =
    page === 1
      ? 0
      : (page - 1) * subsequentPageSize + (initialPageSize - subsequentPageSize)
  const newProfiles = []

  for (let i = startIndex; i < startIndex + pageSize; i++) {
    faker.seed(seed + i) // Update seed for each profile to maintain consistency

    const rawName = faker.person.fullName()
    const rawAddress = faker.address.streetAddress()
    const rawPhone = faker.phone.number(phoneNumberFormat)

    const name = introduceErrors(rawName, errorRate)
    const address = introduceErrors(rawAddress, errorRate)
    const phone = introduceErrors(rawPhone, errorRate)

    const profile = {
      id: faker.datatype.uuid(),
      name,
      address,
      phone
    }

    newProfiles.push(profile)
  }

  return newProfiles
}

export function randomSeed() {
  const chance = new Chance()
  return chance.integer({ min: 0, max: 1000000 })
}
