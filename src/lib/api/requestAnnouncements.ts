import { AnnouncementProps } from "./../../components/Announcements";

import useSWR from "swr";
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const requestAnnouncements = () => {
  const { data, error } = useSWR("/api/announcements", fetcher);

  if (error) return { announcements: [] as AnnouncementProps[], error };
  if (!data) return { announcements: [] as AnnouncementProps[], error: false };
  return { announcements: data, error: false };
};
