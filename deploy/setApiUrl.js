const AWS = require('aws-sdk')
const cloudformation = new AWS.CloudFormation({region: 'ap-northeast-1'})

const fs = require('fs');
const filePath = './static/config.js'

console.log('SetApiUrl: Setting api url in config.js...')
const params = { StackName: process.argv[2] }
cloudformation.describeStacks(params, function(err, data) {
  let serviceEndpint = ''
  if (err) console.log(err, err.stack)
  else {
    outputs = data.Stacks[0].Outputs
    for (let i = 0; i < outputs.length; i++) {
      if (outputs[i].OutputKey == 'ServiceEndpoint') {
        serviceEndpint = outputs[i].OutputValue
        break
      }
    }
    // write over config.js
    const urlDefinitionPrefix = 'const url = '
    const text = fs.readFileSync(filePath).toString().trim()
    let textLines = text.split('\n')
    for (let i = 0; i < textLines.length; i++) {
      if (textLines[i].startsWith(urlDefinitionPrefix)) {
        textLines.splice(i, 1)
      }
    }
    const urlLine = urlDefinitionPrefix + "'" + serviceEndpint + "'"
    textLines.push(urlLine)
    newText = textLines.join('\n')
    fs.writeFileSync(filePath, newText);
  }
  console.log('SetApiUrl: Complete.')
});
