import { Transform } from "stream"
import MappingItem from "./MappingItem"

class Stream extends Transform  {
  configuration: MappingItem[]

  constructor(configuration: MappingItem[]) {
    super({ objectMode: true, writableObjectMode: true })
    this.configuration = configuration
  }

  _transform(chunk:string, encoding, callback) {
    const result = this.configuration.reduce((json, config) => {
      return {
        ...json,
        [config.name]: chunk.toString().substr(config.start - 1, config.length).trim()
      }
    }, {})
    this.push(result)
    callback()
  }
}

export default Stream
