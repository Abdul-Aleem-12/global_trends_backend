import Data from '../models/Data.js';

export const getAllFields = async (req, res) => {
  try {
    const [topics, sectors, regions, sources, countries, cities, pestles, swots, startYears, endYears] = await Promise.all([
      Data.distinct('topic'),
      Data.distinct('sector'),
      Data.distinct('region'),
      Data.distinct('source'),
      Data.distinct('country'),
      Data.distinct('city'),
      Data.distinct('pestle'),
      Data.distinct('swot'),
      Data.distinct('start_year'),
      Data.distinct('end_year'),
    ]);

    res.json({
      topics: topics.filter(Boolean),
      sectors: sectors.filter(Boolean),
      regions: regions.filter(Boolean),
      sources: sources.filter(Boolean),
      countries: countries.filter(Boolean),
      cities: cities.filter(Boolean),
      pestles: pestles.filter(Boolean),
      swots: swots.filter(Boolean),
      startYears: startYears.filter(y => y !== null && y !== '').sort(),
      endYears: endYears.filter(y => y !== null && y !== '').sort(),
    });
  } catch (err) {
    console.error('Error fetching filter fields:', err);
    res.status(500).json({ message: 'Server error', error: err });
  }
};
