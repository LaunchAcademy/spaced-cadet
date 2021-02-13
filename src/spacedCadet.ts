import { createReadStream } from "fs"
import byline from "byline"
import Stream from "./spacedCadet/Stream"

const spacedCadet = (filePath: string, mapping: any) : Stream => {
  const readStream = createReadStream(filePath)
  const spacedStream = new Stream(mapping)

  const lineStream = byline.createStream(readStream)

  return lineStream.pipe(spacedStream)
}

export default spacedCadet
