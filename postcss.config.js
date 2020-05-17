module.exports = context => {
  if (!context.env) {
    return {}
  }

  return {
    plugins: [
      require('autoprefixer')({
        grid: 'autoplace'
      }),
      require('cssnano'),
    ],
  }
}