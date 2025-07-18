import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

export const server = {

  getSpin: defineAction({
    handler: async () => {
      const spinitronApiKey = import.meta.env.SPINITRON_API_KEY;
      if (!spinitronApiKey) {
        return { error: 'API key not set' };
      }
      const url = `https://spinitron.com/api/spins?access-token=${spinitronApiKey}&station=kuaa&count=1&with=show,personas`;
      try {
        const apiRes = await fetch(url);
        const data = await apiRes.json();
        return data;
      } catch (err) {
        return { error: 'Failed to fetch spins' };
      }
    }
  }),

  getRecentSpins: defineAction({
    handler: async () => {
      const apiKey = import.meta.env.SPINITRON_API_KEY;
      if (!apiKey) {
        return { error: 'API key not set' };
      }
      const url = `https://spinitron.com/api/spins?access-token=${apiKey}&station=kuaa&count=6`;
      try {
        const apiRes = await fetch(url);
        const data = await apiRes.json();
        return data;
      } catch (err) {
        return { error: 'Failed to fetch recent spins' };
      }
    }
  })
}