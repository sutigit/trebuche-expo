export function timeAgo(timestamp: string): string {
  const now = new Date();
  const postDate = new Date(timestamp);
  let diffSeconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);

  if (diffSeconds < 5) return "now";
  if (diffSeconds < 60) return `${diffSeconds}s`;

  const minutes = Math.floor(diffSeconds / 60);
  diffSeconds %= 60;
  if (minutes < 60)
    return diffSeconds > 0 ? `${minutes}min ${diffSeconds}s` : `${minutes}min`;

  const hours = Math.floor(minutes / 60);
  const remMinutes = minutes % 60;
  if (hours < 24)
    return remMinutes > 0 ? `${hours}h ${remMinutes}min` : `${hours}h`;

  const days = Math.floor(hours / 24);
  const remHours = hours % 24;
  if (days < 7) return remHours > 0 ? `${days}d ${remHours}h` : `${days}d`;

  const weeks = Math.floor(days / 7);
  const remDays = days % 7;
  if (weeks < 4) return remDays > 0 ? `${weeks}w ${remDays}d` : `${weeks}w`;

  const months = Math.floor(days / 30.4375);
  const remWeeks = Math.floor((days % 30.4375) / 7);
  if (months < 12)
    return remWeeks > 0 ? `${months}m ${remWeeks}w` : `${months}m`;

  const years = Math.floor(days / 365.25);
  const remMonths = Math.floor((days % 365.25) / 30.4375);
  return remMonths > 0 ? `${years}y ${remMonths}m` : `${years}y`;
}
