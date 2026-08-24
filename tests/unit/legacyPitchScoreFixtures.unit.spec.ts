import { describe, expect, it } from 'vitest'
import legacyFixtures from '../../docs/legacy-pitch-score-fixtures.json'
import { calculateLegacyWeightedTotal, type PitchRating } from '@/lib/pitchScoring'

const LEGACY_RATINGS = [0, 1, 3, 9] as const

function asPitchRating(value: number): PitchRating {
  expect(LEGACY_RATINGS).toContain(value)
  return value as PitchRating
}

describe('privacy-safe legacy pitch score fixtures', () => {
  it('contains all 47 distinct tuples representing 168 scored workbook rows', () => {
    expect(legacyFixtures.source.distinctObservedRatingTuples).toBe(47)
    expect(legacyFixtures.source.completeScoredRows).toBe(168)
    expect(legacyFixtures.fixtures).toHaveLength(47)
    expect(legacyFixtures.fixtures.reduce((sum, fixture) => sum + fixture.count, 0)).toBe(168)

    const tupleKeys = legacyFixtures.fixtures.map(({ ratings }) =>
      [
        ratings.investmentFit,
        ratings.investmentPotential,
        ratings.credibility,
        ratings.sustainability,
      ].join(','),
    )
    expect(new Set(tupleKeys)).toHaveProperty('size', 47)
  })

  it.each(legacyFixtures.fixtures)(
    'reproduces $expectedTotal for ratings $ratings (observed $count times)',
    ({ ratings, expectedTotal }) => {
      const actual = calculateLegacyWeightedTotal({
        investmentFit: asPitchRating(ratings.investmentFit),
        investmentPotential: asPitchRating(ratings.investmentPotential),
        credibility: asPitchRating(ratings.credibility),
        sustainability: asPitchRating(ratings.sustainability),
      })

      expect(actual).toBe(expectedTotal)
    },
  )
})
