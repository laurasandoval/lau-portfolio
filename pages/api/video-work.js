export default function handler(req, res) {
  res.status(200).json([
    {
      "caption": "video de balance campaña blabla",
      "period": "2022",
      "location": "San Joaquín, Chile",
      "assets": [
        {
          "src": "balance/abstract-card-intro.mp4",
          "width": 1080,
          "height": 1920,
          "alt": "",
        },
      ]
    },
  ])
}
