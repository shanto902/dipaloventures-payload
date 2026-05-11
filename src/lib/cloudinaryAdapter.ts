import { v2 as cloudinary } from 'cloudinary'
import type { Adapter } from '@payloadcms/plugin-cloud-storage/types'

export const cloudinaryAdapter = (): Adapter => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })

  return ({ collection }) => ({
    name: 'cloudinary',
    async handleUpload({ file, data }) {
      console.log('Uploading to Cloudinary:', file.filename)

      const uploadResult: any = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: 'auto',
            folder: 'dipalo-ventures',
            public_id: file.filename.split('.')[0], // Use filename without extension as public_id
            overwrite: true,
          },
          (error, result) => {
            if (error) {
              console.error('Cloudinary Upload Error:', error)
              return reject(error)
            }
            console.log('Cloudinary Upload Success:', result?.public_id)
            resolve(result)
          },
        )
        uploadStream.end(file.buffer)
      })

      return {
        ...data,
        // We can store the cloudinary info in a field if we want
        // But Payload mostly cares about the filename being correct
      }
    },
    async handleDelete({ filename }) {
      const publicId = `dipalo-ventures/${filename.split('.')[0]}`
      console.log('Deleting from Cloudinary:', publicId)
      await cloudinary.uploader.destroy(publicId)
    },
    generateURL({ filename }) {
      return `https://res.cloudinary.com/${process.env.CLOUDINARY_NAME}/image/upload/f_auto,q_auto/dipalo-ventures/${filename}`
    },
    staticHandler: (req, { params: { filename } }) => {
      const url = `https://res.cloudinary.com/${process.env.CLOUDINARY_NAME}/image/upload/f_auto,q_auto/dipalo-ventures/${filename}`
      return Response.redirect(url, 302)
    },
  })
}
