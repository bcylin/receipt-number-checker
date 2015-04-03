## Receipt Number Checker / 統一發票對獎程式

Result checker for Taiwan Uniform Receipt Lottery

### Demo
http://bcylin.github.io/receipt-number-checker/

### Parse Data

Source: [財政部稅務入口網](http://invoice.etax.nat.gov.tw)

    $ rake parse

Update `data/numbers.json`:

    $ rake update

### Run Locally

    $ rake run

### Build

    $ ./build-receipt.sh

Require:

  - [Node.js](http://nodejs.org/)
  - npm-installed [lessc](http://search.npmjs.org/#/less)
