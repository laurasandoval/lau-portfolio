export default function handler(req, res) {
  res.status(200).json([
    {
      "src": "2019/160419.jpg",
      "alt": "",
      "caption": "Featured in [Accidentally Wes Anderson (2020)](https://accidentallywesanderson.com/book/), by Wally & Amanda Koval.",
      "year": 2019,
      "location": "San Joaquín, Chile"
    },
    {
      "src": "2018/280818.jpg",
      "alt": "",
      "caption": null,
      "year": 2018,
      "location": "Santiago, Chile"
    },
    {
      "src": "2019/280319.jpg",
      "alt": "",
      "caption": "Santiago de Chile",
      "year": 2019,
      "location": "Santiago, Chile"
    },
  ])
}
