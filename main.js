const blocks = [
  { school: true, office: false, hospital: false },
  { school: false, office: false, hospital: false },
  { school: false, office: false, hospital: false },
  { school: false, office: false, hospital: false },
  { school: false, office: false, hospital: false },
  { school: false, office: false, hospital: false },
  { school: false, office: false, hospital: false },
  { school: false, office: false, hospital: false },
  { school: false, office: false, hospital: false },
  { school: false, office: false, hospital: true },
  { school: false, office: false, hospital: false },
  { school: false, office: false, hospital: false },
  { school: false, office: false, hospital: false },
  { school: false, office: false, hospital: false },
  { school: false, office: true, hospital: false },
];

const blocks2 = [
  { apple: false, banana: true, orange: true },
  { apple: true, banana: false, orange: true },
  { apple: false, banana: false, orange: false }
]

const requiredObject = ['school', 'hospital', 'office']

const getTheRightAddress = (blocks, required) => {
  if (!blocks.length) {
    return null
  }

  const helper = Object.fromEntries(required.map(key => [key, []]));

  for (let i = 0; i < blocks.length; i++) {
    for (const key of required) {
      if (blocks[i][key]) {
        helper[key].push(i)
      }
    }
  }

  const rememberedIndexes = Object.fromEntries(required.map(key => {
    if (helper[key].length >= 2) return [key, [helper[key][0], helper[key][1]]]

    return [key, [helper[key][0]]]
  }));

  const sumOfIndexes = []

  for (let i = 0; i < blocks.length; i++) {
    let currentSum = 0

    for (const key of required) {
      if (rememberedIndexes[key].length === 2) {
        if (i <= rememberedIndexes[key][0]) {
          currentSum += Math.abs(i - rememberedIndexes[key][0])
        } else if (i <= rememberedIndexes[key][1] && i > rememberedIndexes[key][0]) {
          const distanceToPrev = Math.abs(i - rememberedIndexes[key][0])
          const distanceToNext = Math.abs(i - rememberedIndexes[key][1])

          currentSum += Math.abs(distanceToPrev <= distanceToNext ? distanceToPrev : distanceToNext)
        } else if (i > rememberedIndexes[key][1]) {
          const currentIndex = helper[key].indexOf(rememberedIndexes[key][1]);

          if (typeof helper[key][currentIndex + 1] === 'number') {
            rememberedIndexes[key][0] = helper[key][currentIndex];
            rememberedIndexes[key][1] = helper[key][currentIndex + 1]

            const distanceToPrev = Math.abs(i - rememberedIndexes[key][0])
            const distanceToNext = Math.abs(i - rememberedIndexes[key][1])

            currentSum += Math.abs(distanceToPrev <= distanceToNext ? distanceToPrev : distanceToNext)
          } else {
            rememberedIndexes[key][0] = rememberedIndexes[key][1]
            rememberedIndexes[key].pop()

            currentSum += Math.abs(i - rememberedIndexes[key][0])
            continue
          }
        }

        continue
      }

      currentSum += Math.abs(i - rememberedIndexes[key][0])
    }

    sumOfIndexes.push(currentSum)
  }
  console.log(sumOfIndexes)
  const firstSmallestIndex = sumOfIndexes.indexOf(Math.min(...sumOfIndexes))
  return firstSmallestIndex
}

console.log(getTheRightAddress(blocks, requiredObject))
console.log(getTheRightAddress(blocks2, ['orange', 'apple', 'banana']))
