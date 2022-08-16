const express = require("express");
const app = express();
const AWS = require("aws-sdk");

app.use(express.json());
const awsConfig = {
    "region": "us-west-2",
    "endpoint": "http://dynamodb.us-west-2.amazonaws.com",
    "accessKeyId": "AKIAZMS4P7E2WVYGBWHW", "secretAccessKey": "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"
};
AWS.config.update(awsConfig);

const docClient = new AWS.DynamoDB.DocumentClient();

app.get("/users/:id", async (req, res) => {
    var params = {
        TableName: "users",
        Key: {
            "id": req.params.id
        },

    };

    let response = {};
    try {
        const data = await docClient.get(params).promise();
        if (data.Item != null) {
            response.data = {
                firstName: data.Item.first_name,
                lastName: data.Item.last_name
            };
        } else {
            response = {code: 404, error: {message: "Item not found"}};
        }
    } catch (err) {
        response = {
            code: 500,
            error: {message: err.message}
        }
    }

    res.status(response.code || 200);
    if (response.error) {
        res.send(response.error);

    } else if (response.data) {
        res.send(response.data);

    }
})
app.post('/users/:id', async (req, res) => {

    const params = {
        TableName: "users",
        Item: {
            "id": req.body.id, "first_name": req.body.first_name, "last_name": req.body.last_name
        },
        ConditionExpression: "attribute_not_exists(id)"
    };
    let response = {};

    try {

        const data = await docClient.put(params).promise()
        response.data = "Register for " + req.body.first_name + " " + req.body.last_name + " successfully!"
    } catch (err) {
        response = {
            code: 500,
            error: {message: err.message}
        }
    }
    res.status(response.code || 200);
    if (response.error) {
        res.send(response.error);

    } else if (response.data) {
        res.send(response.data);

    }
})

app.delete("/users/:id", async (req, res) => {

    const params = {
        TableName: "users",
        Key: {
            "id": req.params.id
        },
        ConditionExpression: "attribute_exists(id)"
    };
    let response = {};

    try {
        const data2 = await docClient.delete(params).promise()
        response.data = "Successfully delete"
    } catch (err) {
        response = {
            code: 500,
            error: {message: err.message}
        }
    }
    res.status(response.code || 200);
    if (response.error) {
        res.send(response.error);

    } else if (response.data) {
        res.send(response.data);

    }


})

app.listen(2000)