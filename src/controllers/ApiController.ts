import { Request, Response } from 'express'
import appRoot from 'app-root-path'
import path from 'path'
import fs from 'fs'

export class ApiController {
  static getByQuery = async (req: Request, res: Response) => {
    const searchTerm: string = req.query.q as string
    const directory: string = `${appRoot}/ftp`

    if (!searchTerm) {
      return res.status(400).json({ message: 'no terms to search' })
    }

    fs.readdir(directory, (err, files) => {
      if (err) {
        return res.status(500).json({ message: 'internal server error' })
      }

      const matchingFiles: object[] = []

      files.forEach((file) => {
        const filePath: string = path.join(directory, file)
        const fileContent: string = fs.readFileSync(filePath, 'utf8')

        if (fileContent.includes(searchTerm)) {
          matchingFiles.push({ [file]: fileContent })
        }
      })

      res.status(200).json({ data: matchingFiles })
    })
  }

  static create = async (req: Request, res: Response) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res
        .status(500)
        .json({ message: 'No files was uploaded in form-data' })
    }

    // Object.keys to get any input field sended in formdata'
    const sampleFile: any = req.files[Object.keys(req.files)[0]]
    if (!sampleFile.name.includes('csv') && !sampleFile.name.includes('txt')) {
      return res
        .status(500)
        .json({ message: 'The file must be a .txt or .csv type' })
    }

    //Use date for single file name
    const uploadPath: string = `${appRoot}/ftp/${Date.now()}.txt`

    sampleFile.mv(uploadPath, function (err: Error) {
      if (err) {
        return res.status(500).json({ message: 'internal server error' })
      }
      res.status(200).json({ message: 'The file was uploaded successfully.' })
    })
  }
}
