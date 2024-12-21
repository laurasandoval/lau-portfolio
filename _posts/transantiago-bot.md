---
title: "Transantiago Bot"
excerpt: "Smart virtual assistant for Santiago de Chile's public transit buses network."
clientSector:
  - "Mobility & Transport"
workType:
  - "Independent Apps"
  - "Engineering"
  - "Chat Bots"
startYear: 2018
endYear: 2019
coverImage: "/assets/design-work/transantiago-bot/transantiago-bot-cover.png"
ogImage: "/assets/design-work/transantiago-bot/social-thumbnail.png"
customThemeColorHex: "#0284F4"
team:
  Product Design:
    - "Laura Sandoval"
  Engineering:
    - "Laura Sandoval"
---

## Background: The Chilean Ministry of Transport's Bot

Back in 2017, amidst the boom of Facebook Messenger and a year after Meta (back then Facebook) announced [Bots for Messenger](https://developers.facebook.com/blog/post/2016/07/01/bots-for-messenger-updates/), the Chilean Ministry of Transport launched their own chat bot for Santiago's —capital city of Chile— public transit bus network, called "Predictor Transantiago" (back then, Transantiago was the city's public transit buses network).

![The official Ministry of Transport's messenger chat bot. 2017.](/assets/design-work/transantiago-bot/mtt-bot-screen-recording-2017.gif)

![The official bot, created by Chile's Ministry of Transport, only replied to messages speficially formatted as "Parada {stop code}". Any typos (!) or any other message resulted in zero replies from the bot.](/assets/design-work/transantiago-bot/mtt-bot-screen-recording-2017-2.gif)

But it kind of sucked.

It didn't leverage any of the modern Messenger Platform APIs for chat bots (like quick replies, persistent menus, etc), nor did it provide any sort of guidance or feedback as to how people were supposed to use it. The only instructions to be found were hidden behind a random news article from the Ministry of Transport's press center, and the bot only really worked like half of the time.

I figured the city deserved better, so, in an attempt to bring a little more dignity to the digital aspect of the city's transit system, I embarqued into making my own.

---

## My take: Transantiago Bot

![Transantiago Bot's onboarding view, leveraging modern Messenger features to provide a more approachable transit experience.](/assets/design-work/transantiago-bot/transantiago-bot-onboarding.png)

By leveraging modern Messenger Platform APIs, Transantiago Bot was able to deliver a consistently more approachable experience than the official alternative, and was jampacked with features to make it your perfect on-the-go transit assistant to Santiago's transit buses.

![Transantiago Bot providing bus ETAs. When the next upcoming bus was electric, Transantiago Bot marked it with a small lightning emoji. Just for fun.](/assets/design-work/transantiago-bot/transantiago-bot-bus-stop.png)

For bus ETAs, users could send the bot a stop code, like on the example above, or just ask using natural language. Users could even specify a particular bus within a bus stop, and Transantiago Bot would filter results to that route only.

![Simplified diagram of how the lightning emoji mechanism worked.](/assets/design-work/transantiago-bot/api-diagram.png)

A fun little detail I added just for fun —and, why not, because I'm a transit nerd— was, whenever the next upcoming bus for a specific bus route was electric, Transantiago Bot marked it with a thunder emoji. This was not straightforward not develop, as there was no publicly available data for which specific buses were electric, and official endpoints from the Ministry of Transport didn't provide that information either. So in order for this feature to exist, I relied on third-party sources who worked 

![When in need of additional information, like a stop code, Transantiago Bot provided guidance to users on what it needed to proceed.](/assets/design-work/transantiago-bot/transantiago-bot-bus-stop-guided.png)

When using the persistent Menu, Transantiago Bot would provide guidance to what specific info was needed—like a stop code, in this case—.