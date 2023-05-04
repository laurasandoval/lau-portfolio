export default function handler(req, res) {
  res.status(200).json([
    {
      "caption": "lorem ipsum dolor sit amet este es un caption de prueba",
      "period": "2022",
      "location": null,
      "assets": [
        {
          "src": "test/test-1.mp4",
          "width": 576,
          "height": 1024,
          "alt": "",
        },
      ]
    },
    {
      "caption": "adsfñldjkhg AAAA probandooOOoOOOOO",
      "period": "2022",
      "location": null,
      "assets": [
        {
          "src": "test/test-3.mp4",
          "width": 1024,
          "height": 576,
          "alt": "",
        },
      ]
    },
    {
      "caption": "esto no es un simulacro!!! es una prueba!!!!! tutuntss",
      "period": "2022",
      "location": null,
      "assets": [
        {
          "src": "test/test-2.mp4",
          "width": 576,
          "height": 1024,
          "alt": "",
        },
      ]
    },
  ])
}
