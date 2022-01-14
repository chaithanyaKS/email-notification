const regex = /\${{(.*?)}}/g

const pattern = "Dear ${{user}} ${{test}}"
console.log([...pattern.matchAll(regex)])
