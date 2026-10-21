const setCache = (cache, key, value, ttl) => {
  cache.set(key, {
    value,
    expiresAt: Date.now() + ttl,
  });
};

const getCache = (cache, key) => {
  const item = cache.get(key);

  if (!item) {
    return null;
  }

  if (Date.now() > item.expiresAt) {
    cache.delete(key);

    return null;
  }

  return item.value;
};

// optional cleanup helper
const clearExpiredCache = (cache) => {
  const now = Date.now();

  for (const [key, value] of cache.entries()) {
    if (now > value.expiresAt) {
      cache.delete(key);
    }
  }
};

module.exports = {
  setCache,
  getCache,
  clearExpiredCache,
};
