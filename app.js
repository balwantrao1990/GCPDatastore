'use strict';
const express = require('express');
const crypto = require('crypto');
const app = express();
app.enable('trust proxy');
const {Datastore} = require('@google-cloud/datastore');
const datastore = new Datastore();
const getRecord = () => 
            {
            const query = datastore.createQuery('Customer');
                return datastore.runQuery(query);
            };
app.get('/customer', async(req,res,next) => {
try{
    const idval = req.query.id;
    console.log(idval);
    const getIdRecord = () => {
        const query = datastore.createQuery('Customer').filter('ID', '=', idval);
        return datastore.runQuery(query);
    };
    if(typeof req.query.id != 'undefined')
        {
            const [entities] = await getIdRecord();
            res.status(200).header("Content-Type",'application/json').send(JSON.stringify(entities,null,4)).end(); 
        }
    else
    {
        const [entities] = await getRecord();
        const records = entities.map(entity => `ID: ${entity.ID}, Name: ${entity.Name} `);
        res.status(200).header("Content-Type",'application/json').send(JSON.stringify(records,null,4)).end();
    }
}catch (error) {
    next(error);
  }
});
const PORT = process.env.PORT || 8080;
app.listen(process.env.PORT || 8080, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
