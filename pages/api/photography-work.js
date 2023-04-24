export default function handler(req, res) {
  res.status(200).json([
    {
      "src": "2019/160419.jpg",
      "alt": "",
      "place": "Santiago de Chile",
      "year": 2019
    },
    {
      "src": "2018/280818.jpg",
      "alt": "",
      "place": "Santiago de Chile",
      "year": 2018
    },
    {
      "src": "2019/280319.jpg",
      "alt": "",
      "place": "Santiago de Chile",
      "year": 2019
    },
  ])
}
