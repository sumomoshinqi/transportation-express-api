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

### Error Codes ###
| Error Code | Error Message                         | Relevant Resources | Parameters          |
| ---------- | ------------------------------------- | ------------------ | :------------------ |
| 1001       | Invalid resource name                 | All Resources      | None                |
| 1002       | Given car does not exist              | `cars`             | None                |
| 1003       | Given driver does not exist           | `drivers`          | None                |
| 1004       | Given passenger does not exist        | `passengers`       | None                |
| 1005       | Invalid property name {0}             | All Resources      | `0 - Property Name` |
| 1006       | Invalid value in {0}                  | All Resources      | `0 - Resource Name` |
| 1007       | No car data                           | `cars`             | None                |
| 1008       | No driver data                        | `driver`           | None                |
| 1009       | No passenger data                     | `passenger`        | None                |
| 1010       | Authentication failed. User not found | `user`             | None                |
| 1011       | Authentication failed. Wrong password | `user`             | None                |
| 1012       | Failed to authenticate token          | All Resources      | None                |
| 1013       | No token provided                     | All Resources      | None                |

