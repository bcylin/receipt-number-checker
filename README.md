## Receipt Number Checker / 統一發票對獎程式

Result checker for Taiwan Uniform Receipt Lottery

### Demo
http://bcylin.github.com/projects/receipt/

### Cached source [[1]](http://invoice.etax.nat.gov.tw/etaxinfo_1.htm "統一發票中獎號碼單") [[2]](http://invoice.etax.nat.gov.tw/etaxinfo_2.htm "統一發票中獎號碼單")

    cache/etaxinfo_1.htm
    cache/etaxinfo_2.htm

### Run Locally

    $ open http://localhost:8000/receipt.html && python -m SimpleHTTPServer

### Build

    $ ./build-receipt.sh

Require:

  - [Node.js](http://nodejs.org/)
  - npm-installed [lessc](http://search.npmjs.org/#/less)


[demo]:http://bcylin.github.com/projects/receipt/