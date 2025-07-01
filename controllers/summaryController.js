import Data from '../models/Data.js';
import getContinent from '../utils/geoMapper.js';

export const getSummaryByContinent = async (req, res) => {
  try {
    const { continent } = req.query;
    if (!continent) {
      return res.status(400).json({ error: 'Continent query param is required' });
    }

    const events = await Data.find({});
    const filtered = continent === 'Global'
      ? events
      : events.filter(e => getContinent(e.region, e.country) === continent);

    if (!filtered.length) {
      return res.status(404).json({ message: 'No records found for this continent' });
    }

    const countryCount = {};
    for (const e of filtered) {
      const country = e.country || 'Unknown';
      countryCount[country] = (countryCount[country] || 0) + 1;
    }

    const topCountries = Object.entries(countryCount)
        .filter(([country]) => country !== 'Unknown')
        .map(([country, count]) => ({ country, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

    const validIntensities = filtered
      .map(e => e.intensity)
      .filter(i => typeof i === 'number' && !isNaN(i));

    const averageIntensity = validIntensities.length
      ? (validIntensities.reduce((a, b) => a + b, 0) / validIntensities.length).toFixed(2)
      : 'N/A';

    const highestRisk = filtered.reduce((max, curr) =>
      (curr.intensity || 0) > (max.intensity || 0) ? curr : max, {});

    const topicCount = {};
    for (const e of filtered) {
      const topic = e.topic || 'Unknown';
      topicCount[topic] = (topicCount[topic] || 0) + 1;
    }

    const topTopics = Object.entries(topicCount)
      .filter(([topic]) => topic !== 'Unknown')
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([topic, count]) => ({ topic, count }));

    const sourceCount = {};
    for (const e of filtered) {
      const source = e.source || 'Unknown';
      sourceCount[source] = (sourceCount[source] || 0) + 1;
    }

    const mostCommonSource = Object.entries(sourceCount)
      .sort((a, b) => b[1] - a[1])[0]?.[0] || 'Unknown';

      res.json({
        continent,
        totalEvents: filtered.length,
        topCountries,
        averageIntensity,
        highestRiskEvent: {
          country: highestRisk.country || 'Unknown',
          intensity: highestRisk.intensity ?? 'N/A',
          topic: highestRisk.topic || 'N/A',
          insight: highestRisk.insight || 'N/A',
        },
        topTopics,
        mostCommonSource
      });

  } catch (err) {
    console.error('Error fetching summary:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
