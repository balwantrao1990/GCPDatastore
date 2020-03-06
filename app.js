// Copyright 2017 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// [START gae_flex_datastore_app]
'use strict';

const express = require('express');
const crypto = require('crypto');

const app = express();
app.enable('trust proxy');

// By default, the client will authenticate using the service account file
// specified by the GOOGLE_APPLICATION_CREDENTIALS environment variable and use
// the project specified by the GOOGLE_CLOUD_PROJECT environment variable. See
// https://github.com/GoogleCloudPlatform/google-cloud-node/blob/master/docs/authentication.md
// These environment variables are set automatically on Google App Engine
const {Datastore} = require('@google-cloud/datastore');
const datastore = new Datastore();
const getRecord = () => {
const query = datastore
.createQuery('Customer');
return datastore.runQuery(query);
 };

/*app.get('/customer', async(_req,res,next)=>{
    //Return the record to the API
try {
    const [entities] = await getRecord();
    const records = entities.map(
      entity => `ID: ${entity.ID}, Name: ${entity.Name} `
    );
    res
      .status(200)
      .set('Content-Type', 'application/json')
      .send(records.toString())
      .end();
  } catch (error) {
    next(error);
  }
});*/
/*app.get('/customer/:id', (req, res, next)=>{
    const id1 = req.query.id;
    console.log(id1);
const fullProfile = {
  //sql: 'select * from Customer where ID= '111''
};
let arr = datastore.runQuery(fullProfile)
callback(arr);
res.status(200).send('user' + req.params.id);

}); */

app.get('/customer', async(req,res,next)=>{
try{
    const idval = req.query.id;
    console.log(idval);
    const getIdRecord = () => {
        const query = datastore
        .createQuery('Customer')
        //.select(['Name', 'Contact'])
        .filter('ID', '=', idval);
        return datastore.runQuery(query);
    };
    if(typeof req.query.id != 'undefined'){
    const [entities] = await getIdRecord();
     res
    .status(200)
    .set('Content-Type', 'application/json')
    .send(entities)
    .end(); 
    }
    else
    {
        const [entities] = await getRecord();
        const records = entities.map(
         entity => `ID: ${entity.ID}, Name: ${entity.Name} `
         
    );
      res
      .status(200)
      .set('Content-Type', 'application/json')
      .send(records.toString())
      .end();

    }
    //console.log(entities);
    //const records = entities.map(
     // const records = entities.entity => `ID: ${entity.ID}, Name: ${entity.Contact}, Contact: ${entity.Name} `
    //);
   
    
       
    
}catch (error) {
    next(error);
  }
});

const PORT = process.env.PORT || 8080;
app.listen(process.env.PORT || 8080, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
