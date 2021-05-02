import byline from "byline"
import {Readable} from "stream"
import Stream from "./spacedCadet/Stream.js"

const spacedCadet = (readStream: Readable, mapping: any, options: any = {}) : Stream => {
  const spacedStream = new Stream(mapping, options)

  const lineStream = byline.createStream(readStream)

  return lineStream.pipe(spacedStream)
}

export default spacedCadet
