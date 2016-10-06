# README #

To Setup the Environment for the first time:
```
#!javascript

npm install
```
To Setup the Intellisense in VisualStudio Code:
```
#!javascript

typings install
```
To Run Tests:
```
#!javascript

./node_modules/.bin/mocha -u exports tests
```

### Error Cods ###
| Error Code | Error Message                   | Relevant Resources | Parameters          |
| ---------- | ------------------------------- | ------------------ | :------------------ |
| 1001       | Invalid resource name {0} given | All Resources      | `0 - Resource Name` |
| 1002       | Given car does not exist        | `cars`             | None                |
| 1003       | Given driver does not exist     | `drivers`          | None                |
| 1004       | Given passenger does not exist  | `passengers`       | None                |
| 1005       | Invalid property name {0}       | All Resources      | `0 - Property Name` |
| 1006       | Invalid value in {0}            | All Resources      | `0 - Resource Name` |
| 1007       | No car data                     | `cars`             | None                |
| 1008       | No driver data                  | `driver`           | None                |
| 1009       | No passenger data               | `passenger`        | None                |
