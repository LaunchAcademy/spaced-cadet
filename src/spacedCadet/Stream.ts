import { Transform } from "stream"
import MappingItem from "./MappingItem"

interface StreamOptions {
  header?: any[]
}
class Stream extends Transform {
  configuration: MappingItem[]
  options: StreamOptions
  headerProps: any
  headerRead: boolean

  constructor(configuration: MappingItem[], options: StreamOptions = {}) {
    super({ objectMode: true, writableObjectMode: true })
    this.configuration = configuration
    this.options = options
    this.headerProps = {}
    this.headerRead = !options.header
  }

  _transform(chunk: string, encoding, callback) {
    if (this.options.header && !this.headerRead) {
      this.headerProps = this.processLine(chunk, this.options.header)
      this.headerRead = true
      callback()
    }
    else {
      const result = {
        ...this.processLine(chunk, this.configuration),
        ...this.headerProps
      }
      this.push(result)
      callback()
    }
  }

  private processLine(chunk, configuration): any {
    return configuration.reduce((json, config) => {
      return {
        ...json,
        [config.name]: chunk.toString().substr(config.start - 1, config.length).trim()
      }
    }, {})
  }
}

export default Stream
