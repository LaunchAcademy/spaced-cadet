import path from "path"
import spacedCadet from "../spacedCadet"
describe("spaced cadet", () => {
  it("creates a stream", async (done) => {
    const filePath = path.join(__dirname, "../../test/fixtures/sampleFile.txt")

    const stream = spacedCadet(filePath, [
      {
        name: "Account",
        length: 8,
        start: 1
      },
      {
        name: "LastName",
        length: 15,
        start: 9
      },
      {
        name: "FirstName",
        start: 25,
        length: 16
      },
      {
        name: 'Balance',
        start: 41,
        length: 12
      },
      {
        name: 'CreditLimit',
        start: 53,
        length: 14
      },
      {
        name: 'AccountCreated',
        start: 67,
        length: 16
      },
      {
        name: 'Rating',
        start: 83,
        length: 6
      }
    ])


    let records = <any>[]
    stream.on('data', function(data) {
      records.push(data)
    })

    stream.on('close', () => {
      expect(records).toHaveLength(6)
      done()
    })

  })
})
