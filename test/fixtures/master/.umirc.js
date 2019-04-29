
export default {
  plugins: [
    ['../../../master', {
      slaves: [
        {
          scripts: ['http://localhost:8002/umi.js'],
          styles: ['http://localhost:8002/umi.css'],
        },
        {
          scripts: ['http://localhost:8003/umi.js'],
          styles: ['http://localhost:8003/umi.css'],
        },
      ]
    }],
  ],
}
