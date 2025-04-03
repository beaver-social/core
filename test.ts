async function main() {
    const res = await fetch("https://sui-mainnet.mystenlabs.com/graphql", {
        method: "POST",
        body: JSON.stringify({
            query: `
query {
  address(
    address: "0x84c23b9b63dc68bf7ca9199a0f11cf10a11092c145c7de1d25df947a033e07be"
  ) {
    address
    defaultSuinsName
  }
}
`}),
        headers: { "x-sui-rpc-show-usage": true }
    })

    const out = await res.text()

    const data = JSON.parse(out)

    console.log(data.data)
}

main()