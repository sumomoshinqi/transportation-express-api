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

To create a sample user (which is currently hard coded in sessions.js)  

**GET**  http://localhost:8080/setup  


  
To obtain a token  

**POST** http://localhost:8080/sessions  



To test api with security token  

*Example* 

http://localhost:8080/api/car?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiZ2V0dGVycyI6e30sIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7Il9fdiI6ImluaXQiLCJhZG1pbiI6ImluaXQiLCJwYXNzd29yZCI6ImluaXQiLCJuYW1lIjoiaW5pdCIsIl9pZCI6ImluaXQifSwic3RhdGVzIjp7Imlnbm9yZSI6e30sImRlZmF1bHQiOnt9LCJpbml0Ijp7Il9fdiI6dHJ1ZSwiYWRtaW4iOnRydWUsInBhc3N3b3JkIjp0cnVlLCJuYW1lIjp0cnVlLCJfaWQiOnRydWV9LCJtb2RpZnkiOnt9LCJyZXF1aXJlIjp7fX0sInN0YXRlTmFtZXMiOlsicmVxdWlyZSIsIm1vZGlmeSIsImluaXQiLCJkZWZhdWx0IiwiaWdub3JlIl19LCJlbWl0dGVyIjp7ImRvbWFpbiI6bnVsbCwiX2V2ZW50cyI6e30sIl9ldmVudHNDb3VudCI6MCwiX21heExpc3RlbmVycyI6MH19LCJpc05ldyI6ZmFsc2UsIl9kb2MiOnsiX192IjowLCJhZG1pbiI6dHJ1ZSwicGFzc3dvcmQiOiJmOTJlY2Q0YjkxZDZmOTFkZGMzOWU4MDU5N2UyYWMwMTE2MDIxNmIwNWU1NmVlMTZmZGNhYzMzYjU5NmE3ZTY1NTg3ZjQzZmNmNzA3NTU2ZDdiMjVjMDU4ZGE3YTc3OWFiNjZmYTUxYThiMGFmNDZmNDZiZDE1ZDQwNjJjMTE5OSIsIm5hbWUiOiJFZGFtIiwiX2lkIjoiNTdmZjJmMzllMDcxZDEyOTk5OTExYTNmIn0sIl9wcmVzIjp7IiRfX29yaWdpbmFsX3NhdmUiOltudWxsLG51bGxdLCIkX19vcmlnaW5hbF92YWxpZGF0ZSI6W251bGxdLCIkX19vcmlnaW5hbF9yZW1vdmUiOltudWxsXX0sIl9wb3N0cyI6eyIkX19vcmlnaW5hbF9zYXZlIjpbXSwiJF9fb3JpZ2luYWxfdmFsaWRhdGUiOltdLCIkX19vcmlnaW5hbF9yZW1vdmUiOltdfSwiaWF0IjoxNDc2MzQ1MDM3LCJleHAiOjE0NzY0MzE0Mzd9.sXuYpZY-F606bWbWq4KKV2BW9C14Fw-nUz6UCA3uhBM
