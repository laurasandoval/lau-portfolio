---
title: "Cornershop by Uber Web App"
excerpt: "Web app refactor and redesign for Cornershop by Uber."
client: "Cornershop by Uber"
clientSector:
  - "Delivery"
  - "Start-up"
workType:
  - "Product Design"
  - "Engineering"
startYear: 2020
endYear: 2020
coverImage: "/assets/design-work/cornershop/cornershop-web-app/cornershop-web-app-iphone-11-and-ipad-pro-11-inch.png"
ogImage: "/assets/design-work/cornershop/cornershop-web-app/social-thumbnail.png"
customThemeColorHex: "#FF404C"
team:
  Design:
    - "Laura Sandoval"
    - "Matías Martínez"
    - "Varsha Ashok"
    - "Gonzalo Castillo"
  Engineering:
    - "Laura Sandoval"
    - "Erasmo Marín"
    - "Francisco Yáñez"
    - "Francisco García"
    - "Gonzalo Castillo"
---

## The [Uber](/work/uber/) Acquisition

Back in 2019, after [Uber acquired a majority stake in Cornershop](https://investor.uber.com/news-events/news/press-release-details/2019/Uber-to-Acquire-Majority-Ownership-in-Cornershop/default.aspx) —which eventually culminated in [the acquisition of the entire company](https://latamlist.com/uber-acquires-cornershop-at-3b-valuation/) in 2021—, we were faced with the challenge of combining the magic of the Cornershop online grocery shopping experience with the scale of the Uber ecosystem.

We wanted the experience to reach as many customers as possible, so integrating into both Uber Rides and Uber Eats was desirable.

After assessing the feasibility of different integration approaches, we decided to lead with a web-powered experience, as it would be the quickest way to reach the most users, and would ultimately benefit both companies, which back then operated separately.

## Bringing the Cornershop Web App to mobile

Cornershop's web app, originally designed for desktop use, only served a small fraction of the company's user base, and was actively maintained by a small team of 4 engineers.

![The original pull request for the refactor. More than 18K lines of code changed, and 248 files had to be modified.](/assets/design-work/cornershop/cornershop-web-app/cornershop-web-app-github-pr.png)

Bringing it to mobile was a stepping stone towards its eventual key role in the company's acquisition, but it was no small task.

Bringing the Cornershop web app to mobile required a complete redesign and development of the website (more than 18K lines of code changed, and 248 files had to be modified), as the original web app was not designed to support smaller screen sizes, or mobile interactions & paradigms.

![Screen recording of the final web app experience.](/assets/design-work/cornershop/cornershop-web-app/cornershop-web-app-demo.mp4)

While preserving its underlying JavaScript foundations, the entire markup and CSS of the web app were reimagined and rebuilt from the ground up, taking advantage of modern CSS technologies (like CSS Grid, native scroll-snapping, and more) to achieve native-feeling interactions, visually polished UI elements, and a brand new, mobile-first component library—all while taking the opportunity to significantly improve accessibility for both screen readers and keyboard users throughout every point of the experience.

![Before and after of the web app's Home view.](/assets/design-work/cornershop/cornershop-web-app/cornershop-web-app-before-and-after-1.png)

![Before and after of the web app's Home view.](/assets/design-work/cornershop/cornershop-web-app/cornershop-web-app-before-and-after-2.png)

![Before and after of the web app's Store view.](/assets/design-work/cornershop/cornershop-web-app/cornershop-web-app-before-and-after-3.png)

Most JavaScript-powered UI libraries were deprecated from the codebase afterward, helping consolidate a mature, proprietary, and flexible design and development environment.

---

![](/assets/design-work/cornershop/cornershop-web-app/cornershop-web-app-iphone-11-dark-mode.png)

![](/assets/design-work/cornershop/cornershop-web-app/cornershop-web-app-ipad-pro-11-inch.png)


![](/assets/design-work/cornershop/cornershop-web-app/cornershop-web-app-iphone-11-fruits-and-vegetables.png)


![](/assets/design-work/cornershop/cornershop-web-app/cornershop-web-app-iphone-11-and-iphone-se-2.png)

Cornershop was an Uber-owned grocery delivery service that offered world-class digital products powered by software and design. It debuted in 2015, was acquired by Uber in 2021, and later migrated to Uber Eats in 2023, bringing the magic of the Cornershop experience to millions of users worldwide.