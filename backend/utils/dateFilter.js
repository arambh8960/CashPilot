const getDateRange = (range) => {
  const now = new Date();
  let start;

  switch (range) {
    case "daily":
      start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;

    case "weekly": {
      // FIX: clone now before mutating to avoid corrupting `end`
      const cloned = new Date(now);
      const firstDayOfWeek = cloned.getDate() - cloned.getDay();
      start = new Date(cloned.setDate(firstDayOfWeek));
      start.setHours(0, 0, 0, 0);
      break;
    }

    case "monthly":
      start = new Date(now.getFullYear(), now.getMonth(), 1);
      break;

    case "yearly":
      start = new Date(now.getFullYear(), 0, 1);
      break;

    default:
      start = new Date(now.getFullYear(), now.getMonth(), 1);
  }

  return { start, end: new Date() };
};

export default getDateRange;