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

At the begginning of 2019, Cornershop's web app, originally designed for desktop use, only served a small fraction of the company's user base, and was actively maintained by a small team of 4 engineers on the front-end side.

![The original pull request for the refactor. More than 18K lines of code changed, and 248 files had to be modified.](/assets/design-work/cornershop/cornershop-web-app/cornershop-web-app-github-pr.png)

Because it was never really intented for mobile, the experience was not optimized for touch input. Even the simpler things, like scroll snapping, were powered by JavaScript-heavy physics, which heavily impacted performance when attempted to be used on touch devices (like a phone or a tablet), and ultimately killed the illusion of a native, snappy experience—which we believed to be a key component for the success of the Uber integration.

While bringing it to mobile was a stepping stone towards its eventual key role in the company's acquisition, it was no small task.

> Bringing the Cornershop web app to mobile required a complete redesign and development of the website. More than 18K lines of code changed, and 248 files had to be modified.

We, of course, did not ask someone to review a +18-lines-pull-request, but rather adopted the new refactor branch as the new codebase for our web app. Any iterative work on the workstream was reviewed and merged into the refactor branch, which was then (carefully) deployed to production all at once, given the scale of the changes.

![Screen recording of the final web app experience.](/assets/design-work/cornershop/cornershop-web-app/cornershop-web-app-demo.mp4)

> When we gave the Uber team a first demo of the redesign, the first question was: "Are you sure this is your web app?".

While preserving its underlying JavaScript foundations and business logic, the entire markup and CSS of the web app were reimagined and rebuilt from the ground up, taking advantage of modern CSS technologies like CSS Grid and native scroll-snapping to achieve native-feeling interactions, highly crafted UI components, and a brand new, mobile-first component library—all while taking the opportunity to significantly improve accessibility for both screen readers and keyboard users throughout every touchpoint of the experience.

![Evangelizing the entire Cornershop engineering team, 100 engineers total by mid-2020 —when this session took place—, about the importance of touch targets when coding for touch interfaces, and how to optimize them in code.](/assets/design-work/cornershop/cornershop-web-app/adjusting-touch-targets.png)

![Sharing some of the challenges specific to our grocery oriented components, how they're interpreted by screen readers, and how we can easily optimize them for better accessibility.](/assets/design-work/cornershop/cornershop-web-app/screen-readers-item-thumbnail.png)

In order to promote a sustained accessibility culture over time, we also organized a series of sessions with the entire engineering team, evangelizing about different accessibility challenges, considerations, and best practices when coding for web. My Android and iOS counterparts did similar sessions for their respective platforms.

![Streamlining colors into standalone CSS variables allowed us to introduce dark mode in our web app "for free" through the redesign, closing another gap with our native apps, and laying the foundations for an upcoming theming engine, that'd allow us to launch on Uber.](/assets/design-work/cornershop/cornershop-web-app/cornershop-web-app-iphone-11-dark-mode.png)

By reducing JavaScript dependencies on the Cornershop Web UI and optimizing for CSS performance —leveraging CSS transforms, delegating physics to the system, etc.—, we were able to achieve a much closer to native-feeling experience, with performance improvements that ultimately benefited all users.

![The redesigned web app on an iPad Pro.](/assets/design-work/cornershop/cornershop-web-app/cornershop-web-app-ipad-pro-11-inch.png)

![](/assets/design-work/cornershop/cornershop-web-app/cornershop-web-app-iphone-11-fruits-and-vegetables.png)

And because we hollistically designed all components to be responsive from the ground-up, the redesigned codebase had much stronger foundations to be maintained and scaled over time.

![Before and after of the web app's Home view.](/assets/design-work/cornershop/cornershop-web-app/cornershop-web-app-before-and-after-1.png)

![Before and after of the web app's Home view.](/assets/design-work/cornershop/cornershop-web-app/cornershop-web-app-before-and-after-2.png)

![Before and after of the web app's Store view.](/assets/design-work/cornershop/cornershop-web-app/cornershop-web-app-before-and-after-3.png)

The Cornershop Web App eventually [launched on Uber Eats on Tuesday, July 7, 2020](https://www.uber.com/newsroom/introducing-grocery-delivery/), two days after my 22nd birthday, which I spent coding the last details to it with my engineering colleagues. [You can see more from the Uber Grocery MVP here](/work/uber/uber-grocery-with-cornershop/).

It was the main canvas through which Uber grew its grocery delivery business from $0.5B to $4.5B ARR from 2020 to 2023, and it grew to be one of the main acquisition channels for Cornershop while it operated as a separate entity as well, thanks to newly unlocked mobile web traffic.

Cornershop was sunsetted in 2023, when it was integrated natively into Uber Eats, bringing the magic of the Cornershop experience to millions of users worldwide.