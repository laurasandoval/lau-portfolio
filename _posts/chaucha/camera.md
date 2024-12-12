---
title: "Chaucha Camera "
excerpt: "Chaucha is a Chilean app to transcribe incorrectly formatted wire transfer details —both from text & images— into clean, banking-app-friendly information."
client:
  - "Chaucha"
clientSector:
  - "Banking & Finance"
workType:
  - "Product Design"
  - "Engineering"
  - "Independent Apps"
startYear: 2024
endYear: 2024
coverImage: "/assets/design-work/chaucha/camera/chaucha-camera.mp4"
ogImage: "/assets/design-work/chaucha/social-thumbnail.png"
customThemeColorHex: "#BC7C47"
team:
  Design:
    - "Laura Sandoval"
  iOS Engineering:
    - "Laura Sandoval"
  Special thanks to:
    - "Bárbara Molina"
    - "Martín Calderón"
---

Unlike in the US, middle services between consumers and banks like Venmo, Apple Pay Cash, Revolut, etc., are not popular or widely available in Chile. This is partially because of a long, complicated history of a banking infrastructure monopoly, but also because wire transfers in Chile are instant, mostly free (depends on the bank but they usually are), and available to use 24/7—which is great.

## Wire transfers in Chile: The Good and the Bad

Let's quickly outline how wire transfers work in Chile.

For any given wire transfer, as a consumer, you need a fixed set of information from the business or person you're transferring money to:

1. **Name**: The business or person's name.
2. **RUT**: A unique ID that all Chileans and Chilean businesses have, for tax purposes.
3. **Email address**: Optional. Only used to send a transaction confirmation.
4. **Bank**: Which bank will the transaction go to.
5. **Account Type**: Checking or Savings.
6. **Account Number**: The account number.

Because everyone sort of knows this, in any given scenario where in the US people would say "send me a Venmo request" (think buying something off of Etsy, splitting the bill, etc.), in Chile they say "send me your transfer info," which usually looks something like this:

![A typical Chilean convo.](/assets/design-work/chaucha/chilean-message-example.png)

Given this format has been around for many years now, most Chilean banking apps have naturally adapted to it and typically try to auto-fill everything for you whenever you start a wire transfer to a new recipient.

![Chilean banking apps have mostly adapted to this standard, to the point where it's now ubiquitous for them to try and auto-fill the data from your clipboard.](/assets/design-work/chaucha/banking-app-example.png)

This all works great in theory. However, while banks have successfully adapted to interpret wire transfer information in the way a bank would write it, they've largely failed to adapt further and interpret the information in all the possible ways a person might write it, resulting in very inconsistent results whenever people change a variable (like the order of elements, or an oddly formatted RUT) or include any piece of additional information in the message (like a "hey" or a "thank you").

![People will always be people, and with so many variables, it's unrealistic to expect everyone to send their info perfectly formatted every time.](/assets/design-work/chaucha/message-formats.png)

Moreover, small and medium businesses who rely exclusively on wire transfers to receive payments often send their transfer info as branded images, which, though cute sometimes, is completely unusable for banking apps, forcing consumers to manually input the information anyway.

![SMBs will often send their wire transfer info as images, which aren't supported by any banking app and are prone to user error and churn.](/assets/design-work/chaucha/smb-example.png)

## Chaucha

Enter… Chaucha. Chaucha is a single-purpose app designed to bridge the gap between consumers and their banking apps. Its proprietary **Chaucha Engine** was thoroughly designed to be the most flexible on the market, and detect almost every possible way a user could type in their wire transfer info.

![Chaucha makes wire transfers easier.](/assets/design-work/chaucha/chaucha-inline.png)

![On top of text input, users can also take a photo or choose one from their camera roll to try and look for wire transfer info in it.](/assets/design-work/chaucha/chaucha-screen-recording-demo.mp4)

Chaucha was launched in early 2023 for roughly $2.99 USD on the App Store. It tells you a random banking pun when you first open it, and lets you instantly turn human-formatted wire transfer info into a Chilean-banking-app-friendly format. It supports photos & texts, and does everything completely on-device. Within 24 hours of launching, Chaucha was already the most downloaded paid app of the day in Chile.

> Within 24 hours, Chaucha was already the most downloaded paid app of the day in Chile.

![The app launch went viral on Twitter, TikTok and Instagram.](/assets/design-work/chaucha/tweet.png)

![What people said. Translated from Spanish.](/assets/design-work/chaucha/chaucha-user-posts.png)

## The Video

Thanks to the support of my colleagues Dylan Babbs and Jenny Morrice, at the beginning of 2024, I had the opportunity to present Chaucha to my teammates at Uber Design during a design-wide all-hands meeting called "Show & Tell."

See the full video I presented below.

![Learn more about Chaucha, its algorithm, and watch me being a silly goose.](https://youtu.be/L3pePM64cDk)