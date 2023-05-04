export default function handler(req, res) {
  res.status(200).json([
    {
      "caption": "video de balance campaña blabla",
      "period": "2022",
      "location": "San Joaquín, Chile",
      "assets": [
        {
          "src": "test/test-1.mp4",
          "width": 1080,
          "height": 1920,
          "alt": "",
        },
      ]
    },
    {
      "caption": "adsfñldjkhg AAAA",
      "period": "2022",
      "location": "San Joaquín, Chile",
      "assets": [
        {
          "src": "test/test-3.mp4",
          "width": 2160,
          "height": 3840,
          "alt": "",
        },
      ]
    },
    {
      "caption": "video de balansdñflkhdce campaña blabla",
      "period": "2022",
      "location": "San Joaquín, Chile",
      "assets": [
        {
          "src": "test/test-2.mp4",
          "width": 1080,
          "height": 1920,
          "alt": "",
        },
      ]
    },
  ])
}
