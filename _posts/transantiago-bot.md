---
title: "Transantiago Bot"
excerpt: "Smart virtual assistant for Santiago de Chile's public transit bus network."
clientSector:
  - "Mobility & Transport"
workType:
  - "Independent Apps"
  - "Engineering"
  - "Chat Bots"
startYear: 2018
endYear: 2019
coverImage: "/assets/design-work/transantiago-bot/transantiago-bot-cover.mp4"
ogImage: "/assets/design-work/transantiago-bot/social-thumbnail.png"
customThemeColorHex: "#0284F4"
team:
  Product Design:
    - "Laura Sandoval"
  Engineering:
    - "Laura Sandoval"
---

## Background: The Chilean Ministry of Transport's Bot

Back in 2017, during the boom of Facebook Messenger and a year after Meta (then Facebook) announced [Bots for Messenger](https://developers.facebook.com/blog/post/2016/07/01/bots-for-messenger-updates/), the Chilean Ministry of Transport launched its own chatbot for Santiago's public transit bus network. The bot, called "Predictor Transantiago," was meant to help users navigate Transantiago (the city's public transit bus system at the time) by providing live bus ETAs.

![The official Ministry of Transport's Messenger chatbot. 2017.](/assets/design-work/transantiago-bot/mtt-bot-screen-recording-2017-2.gif)

![The official bot, created by Chile's Ministry of Transport, only replied to messages specifically formatted as "Parada {stop code}". Any typos (!) or any other message resulted in zero replies from the bot.](/assets/design-work/transantiago-bot/mtt-bot-screen-recording-2017.gif)

But it kind of sucked.

The official chatbot didn't offer any guidance or feedback on how to use it, it only replied to a predefined command by the Ministry of Transport, and it didn’t take advantage of any modern Messenger Platform API for chatbots (like quick replies or persistent menus). It was as dummy as a chatbot can get. To make things worse, the bot only really worked about half the time, so it was both hard to use and hard to rely on.

I figured **the city deserved better.** So, in an attempt to bring some dignity to the digital side of Santiago's transit system, I took at stab at making my own.

---

## My Take: Transantiago Bot

![Transantiago Bot's onboarding experience, leveraging modern Messenger features to provide a more approachable experience to transit, compared to the official alternative.](/assets/design-work/transantiago-bot/transantiago-bot-onboarding.mp4)

By leveraging modern Messenger Platform APIs, Transantiago Bot delivered a consistently better and more approachable experience than the official alternative. 

Modern APIs allowed it to have buttons, images, and even a persistent menu pinned at the bottom of the screen, with shortcuts to its main features, for easy access.

It used natural language, complemented its replies with imagery when useful, and was packed with features to make it the perfect on-the-go transit assistant for Santiago's bus network—beyond just bus ETAs.

![When in need of additional information, like a stop code, Transantiago Bot provided guidance to users on what it needed to proceed.](/assets/design-work/transantiago-bot/transantiago-bot-bus-stop-guided.mp4)

![Transantiago Bot providing bus ETAs. When the next upcoming bus was electric, Transantiago Bot marked it with a small lightning emoji. Just for fun.](/assets/design-work/transantiago-bot/transantiago-bot-bus-stop.png)

To check bus ETAs, users could send the bot a plain stop code—like in the example above—, ask the chatbot in natural language, or just use the persistent menu, from which Transantiago Bot would guide users on what it needed to proceed.

![](/assets/design-work/transantiago-bot/transantiago-bot-bus-stop-lightning.png)

One fun detail I added (because why not?) was marking the next bus with a lightning emoji if it was electric. Back in 2017, Santiago was in the midst of becoming the #1 city with the most electric buses outside of China, and the first new buses were starting to arrive—so I figured I’d celebrate that.

![Simplified diagram of how the lightning emoji mechanism worked.](/assets/design-work/transantiago-bot/api-diagram.png)

This feature wasn’t straightforward to implement, though, as there wasn’t any publicly available data on which buses were electric at the time, and the Ministry of Transport’s official endpoints didn’t provide that info either.

To make this work, I relied on third-party sources (e.g., people who worked at internal transit agencies) to maintain my own internal database of electric bus license plates. Each time Transantiago Bot generated a bus ETA response, it compared the license plate of buses approaching a specific stop to my database and marked them with the emoji if they matched.

While this approach was evidently not scalable over time, it quickly proved to be a delightful little detail and was even incorporated into the Ministry of Transport's official transit apps later on.

---

> After serving around ~300 organic monthly active users, Transantiago Bot was eventually sunsetted in 2019, following a failed acquisition attempt by Chile's Ministry of Transport.

In the words of their own technical project lead, it was cheaper for them to just "copy what I did," so they pulled back. They never iterated on their official product, though. Instead, they hired—I'm not kidding—a human employee to manually reply to their own chatbot behind the scenes. Unsurprisingly, it eventually stopped working a few months later. 

Maybe the real chatbots were the friends we made along the way.