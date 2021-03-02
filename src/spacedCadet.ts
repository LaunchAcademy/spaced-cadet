import { createReadStream } from "fs"
import byline from "byline"
import Stream from "./spacedCadet/Stream"

const spacedCadet = (filePath: string, mapping: any, options: any = {}) : Stream => {
  const readStream = createReadStream(filePath)
  const spacedStream = new Stream(mapping, options)

  const lineStream = byline.createStream(readStream)

  return lineStream.pipe(spacedStream)
}

export default spacedCadet
