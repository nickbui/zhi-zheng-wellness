/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SessionType {
  id: string;
  title: string;
  duration: string;
  description: string;
  price: string;
  icon: string;
}

export interface BookedSession {
  id: string;
  name: string;
  email: string;
  sessionType: SessionType;
  date: string;
  timeSlot: string;
  createdAt: string;
  notes?: string;
}

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  description: string;
  image: string;
  category: "book" | "resource" | "audio";
  features?: string[];
}

export interface ContentVideo {
  id: string;
  title: string;
  duration: string;
  youtubeUrl: string;
  thumbnailUrl: string;
}

export interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  likes: string;
  comments: string;
}

export interface EbookChapter {
  title: string;
  subtitle: string;
  introduction: string;
  sections: {
    heading: string;
    content: string;
  }[];
  exercises: {
    title: string;
    description: string;
    steps: string[];
  }[];
}
