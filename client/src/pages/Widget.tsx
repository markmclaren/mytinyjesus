/**
 * MyTinyJesus — archive-informed Flash recreation
 * Design: stationary Jesus at the bright-field / black-reflection boundary.
 * Behaviour: one fictional, period-authentic message appears at a time above him.
 */

import { useEffect, useMemo, useState } from "react";
import { ADDITIONAL_TWEETS } from "@/data/additionalTweets";

interface Tweet {
  id: string;
  text: string;
  screenName: string;
  name: string;
  date: string;
}

// These are original fictional messages written for this recreation; the
// original Twitter archive was never captured by the Wayback Machine.
const ORIGINAL_SET: Tweet[] = [
  { id: "1", text: "Blessed are the meek, for they shall inherit the earth. Also, maybe try decaf.", screenName: "mytinyjesus", name: "My Tiny Jesus", date: "Apr 3, 2009" },
  { id: "2", text: "Turn the other cheek. Unless someone takes your parking spot. Then just sigh deeply.", screenName: "mytinyjesus", name: "My Tiny Jesus", date: "Apr 5, 2009" },
  { id: "3", text: "Love thy neighbour as thyself. Even the one with the leaf blower at 7am.", screenName: "mytinyjesus", name: "My Tiny Jesus", date: "Apr 12, 2009" },
  { id: "4", text: "I am the way, the truth, and the life. Also available as a desktop widget.", screenName: "mytinyjesus", name: "My Tiny Jesus", date: "Apr 19, 2009" },
  { id: "5", text: "Do unto others as you would have them do unto you. Especially on the internet.", screenName: "mytinyjesus", name: "My Tiny Jesus", date: "Apr 26, 2009" },
  { id: "6", text: "Ask and it shall be given to you. Seek and you shall find. Knock and it shall be opened. (Terms and conditions apply.)", screenName: "mytinyjesus", name: "My Tiny Jesus", date: "May 3, 2009" },
  { id: "7", text: "The truth shall set you free. But first it will make you uncomfortable.", screenName: "mytinyjesus", name: "My Tiny Jesus", date: "May 10, 2009" },
  { id: "8", text: "Consider the lilies of the field. They neither toil nor spin, yet they have excellent branding.", screenName: "mytinyjesus", name: "My Tiny Jesus", date: "May 17, 2009" },
  { id: "9", text: "Forgive seventy times seven. That's 490 times. I have been counting.", screenName: "mytinyjesus", name: "My Tiny Jesus", date: "May 24, 2009" },
  { id: "10", text: "Judge not, lest ye be judged. (Looking at you, comment sections.)", screenName: "mytinyjesus", name: "My Tiny Jesus", date: "Jun 1, 2009" },
  { id: "11", text: "Blessed are the peacemakers. They have the hardest job at Thanksgiving.", screenName: "mytinyjesus", name: "My Tiny Jesus", date: "Jun 8, 2009" },
  { id: "12", text: "Man shall not live by bread alone. Occasionally you need soup.", screenName: "mytinyjesus", name: "My Tiny Jesus", date: "Jun 15, 2009" },
  { id: "13", text: "Let your light shine before men. But maybe dim it a little in the cinema.", screenName: "mytinyjesus", name: "My Tiny Jesus", date: "Jun 22, 2009" },
  { id: "14", text: "Render unto Caesar what is Caesar's. File your taxes.", screenName: "mytinyjesus", name: "My Tiny Jesus", date: "Jun 29, 2009" },
  { id: "15", text: "The last shall be first. This is why I always board the plane last.", screenName: "mytinyjesus", name: "My Tiny Jesus", date: "Jul 6, 2009" },
  { id: "16", text: "A house divided against itself cannot stand. Please stop arguing about the thermostat.", screenName: "mytinyjesus", name: "My Tiny Jesus", date: "Jul 13, 2009" },
  { id: "17", text: "Blessed are the pure in heart, for they shall see God. Also, they sleep better.", screenName: "mytinyjesus", name: "My Tiny Jesus", date: "Jul 20, 2009" },
  { id: "18", text: "Come to me, all who are weary and burdened, and I will give you rest. And maybe a snack.", screenName: "mytinyjesus", name: "My Tiny Jesus", date: "Jul 27, 2009" },
  { id: "19", text: "Do not worry about tomorrow. Tomorrow has enough worries of its own. (Monday especially.)", screenName: "mytinyjesus", name: "My Tiny Jesus", date: "Aug 3, 2009" },
  { id: "20", text: "Salt of the earth. Light of the world. Also available as a fridge magnet.", screenName: "mytinyjesus", name: "My Tiny Jesus", date: "Aug 10, 2009" },
  { id: "21", text: "Seek first the kingdom of God. Then maybe check your email.", screenName: "mytinyjesus", name: "My Tiny Jesus", date: "Aug 17, 2009" },
  { id: "22", text: "With God all things are possible. Except perhaps parallel parking.", screenName: "mytinyjesus", name: "My Tiny Jesus", date: "Aug 24, 2009" },
  { id: "23", text: "The meek shall inherit the earth. They are just waiting for the paperwork to clear.", screenName: "mytinyjesus", name: "My Tiny Jesus", date: "Sep 1, 2009" },
  { id: "24", text: "Peace I leave with you. My peace I give to you. Not as the world gives. The world's Wi-Fi is terrible.", screenName: "mytinyjesus", name: "My Tiny Jesus", date: "Sep 8, 2009" },
  { id: "25", text: "I have come that they may have life, and have it to the full. Full like a good inbox. Zero unread.", screenName: "mytinyjesus", name: "My Tiny Jesus", date: "Sep 15, 2009" },
];

const TWEET_POOL: Tweet[] = [...ORIGINAL_SET, ...ADDITIONAL_TWEETS];
const MESSAGE_INTERVAL = 9000;

export default function Widget() {
  const order = useMemo(
    () => [...TWEET_POOL].sort(() => Math.random() - 0.5),
    [],
  );
  const [tweetIndex, setTweetIndex] = useState(0);
  const [isEntering, setIsEntering] = useState(true);
  const tweet = order[tweetIndex];

  const advanceTweet = () => {
    setIsEntering(false);
    window.setTimeout(() => {
      setTweetIndex((index) => (index + 1) % order.length);
      setIsEntering(true);
    }, 170);
  };

  useEffect(() => {
    const interval = window.setInterval(advanceTweet, MESSAGE_INTERVAL);
    return () => window.clearInterval(interval);
  }, [order.length]);

  return (
    <main className="tiny-jesus-stage" aria-label="My Tiny Jesus">
      <section className="bright-field" aria-hidden="true" />
      <section className="reflective-floor" aria-hidden="true" />

      <div className="archive-mark" aria-label="My Tiny Jesus, Saviour 2.0">
        <span>mytinyjesus.com</span>
        <i />
        <span>saviour 2.0</span>
      </div>

      <button
        type="button"
        className={`speech-bubble ${isEntering ? "speech-bubble--visible" : ""}`}
        onClick={advanceTweet}
        aria-label="Show the next message"
      >
        <span className="speech-bubble__message">{tweet.text}</span>
        <span className="speech-bubble__meta">
          <strong>{tweet.name}</strong>
          <em>@{tweet.screenName}</em>
          <time>{tweet.date}</time>
        </span>
        <span className="speech-bubble__tail" aria-hidden="true" />
      </button>

      <div className="jesus-figure" aria-hidden="true">
        <img src="/manus-storage/jesus_transparent_e866f36b.png" alt="" draggable={false} />
      </div>
      <div className="jesus-reflection" aria-hidden="true">
        <img src="/manus-storage/jesus_transparent_e866f36b.png" alt="" draggable={false} />
      </div>

      <div className="floor-note">125 fictional messages · click a bubble for another</div>
      <a className="confess-link" href="mailto:confess@mytinyjesus.com">confess</a>
    </main>
  );
}
