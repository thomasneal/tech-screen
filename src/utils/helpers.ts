
import { formatDistance } from "date-fns";

export function formatRelativeTime(dateString: string) {
  return formatDistance(new Date(dateString), new Date(), { addSuffix: true });
}