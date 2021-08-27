const cloudinary = require('cloudinary')

cloudinary.config({
  cloud_name: 'dd97mjjt2',
  api_key: '274253912236812',
  api_secret: 'Uwjh26mCiIyphfEC46B2Fm-LFDA'
})

exports.uploads = (file, folder) => {
  return new Promise(resolve => {
    cloudinary.uploader.upload(
      file,
      result => {
        resolve({
          url: result.url,
          id: result.public_id
        })
      },
      {
        resource_type: 'auto',
        folder: folder
      }
    )
  })
}
