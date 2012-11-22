## Receipt Number Checker / 統一發票對獎程式

Result checker for Taiwan Uniform Receipt Lottery

### Demo
http://bcylin.github.com/projects/receipt/

### Parse Data

    $ ./data/parser.rb

Source: [[1]](http://invoice.etax.nat.gov.tw/invoice.html)

    cache/invoice.html

Output:

    data/numbers.json

### Run Locally

    $ open http://localhost:8000/receipt.html && python -m SimpleHTTPServer

### Build

    $ ./build-receipt.sh

Require:

  - [Node.js](http://nodejs.org/)
  - npm-installed [lessc](http://search.npmjs.org/#/less)