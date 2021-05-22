const converter = require('json-2-csv');
const fs = require('fs');
const path = require('path');

exports.testAssessmentL2 = async (req, res, next) => {
  console.log('tests');
  console.log('body', req.body);
  // Requiring users file
  const users = req.body;

  /**
  1 value !=0 ?" push"
  0  value = 0 flag = true store in aray
  0 value = 0 flag=true store in array
  0  
  0 value =0 flag true, store
  1 value !=0 ,counter value =4  ? if counter > 3, push 4-0's, flag false , counter =0 then push 1
**/

  let flag = false;
  let counter = 0;
  array1 = []; //pushing non zero values
  array2 = []; // for storing 0's
  for (let i in users) {
    if (users[i].RPM != '0' && users[i].RPM > '1500' && flag == false) {
      array1.push(users[i]);
      // console.log('pushed 1');
    } else if (users[i].RPM == '0' && flag == false) {
      counter = counter + 1;
      flag = true;
      array2.push(users[i]);
      // console.log('storing 1');
    } else if (users[i].RPM == '0' && flag == true) {
      array2.push(users[i]);
      counter = counter + 1;
      // console.log('storing 2');
    } else if (users[i].RPM !== '0' && users[i].RPM > '1500' && flag == true) {
      if (counter > 3) {
        // console.log(counter);

        for (var j in array2) {
          array1.push(array2[j]);
        }

        flag = false;
        counter = 0;
        array1.push(users[i]);
        array2 = [];
      } else {
        flag = false;
        counter = 0;
        array1.push(users[i]);
        array2 = [];
      }
    }
  }

  converter.json2csv(array1, (err, csv) => {
    if (err) {
      throw err;
    }
    fs.writeFileSync('finalDataSet.csv', csv);
  });
  // }

  //console.log(users);
  res.status(200).json({
    status: 'success',
    results: array1.length,
    data: array1,
  });
};
