var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var router = express.Router();
var m = require("./model/mongo");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const {
    valid
} = require('./middleware');
const rtsIndex = require('./routes/index.router');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    "extended": false
}));
app.use(cors());
app.use(cookieParser());
app.use('/api', rtsIndex);

app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
});

router.get("/", function(req, res) {
    res.json({
        "error": false,
        "message": "Enter correct URL"
    });
});


router.route("/Employee")
    .get(function(req, res) {
        response = {};
        m.find({}, function(err, data) {
            // Mongo command to fetch all data from collection.
            if (err) {
                response = {
                    "error": true,
                    "message": "Error fetching data"
                };
            } else {
                response = {
                    "error": false,
                    "message": data
                };
            }
            res.json(response);
        });
    });

router.route("/Detail/dev").get(function(req, res) {
    m.aggregate([{
            $match: {
                Role: "Developer"
            }
        },
        {
            $unwind: "$Competency"
        },
        {
            $project: {
                Role: 1,
                E0: {
                    $cond: [{
                        $eq: ["$Competency.Level", "E0"]
                    }, 1, 0]
                },
                E1: {
                    $cond: [{
                        $eq: ["$Competency.Level", "E1"]
                    }, 1, 0]
                },
                E2: {
                    $cond: [{
                        $eq: ["$Competency.Level", "E2"]
                    }, 1, 0]
                }
            }
        },
        {
            $group: {
                _id: "$Role",
                E0: {
                    $sum: "$E0"
                },
                E1: {
                    $sum: "$E1"
                },
                E2: {
                    $sum: "$E2"
                }
            }
        }, {
            $project: {
                E0: {
                    $toString: "$E0"
                },
                E1: {
                    $toString: "$E1"
                },
                E2: {
                    $toString: "$E2"
                }
            }
        }

    ], function(err, result) {

        if (err) {
            res.send(err)
        } else {
            res.json(result)
        }

    })


});

router.route("/Detail/techlead").get(function(req, res) {
    m.aggregate([{
            $match: {
                Role: "TechLead"
            }
        },
        {
            $unwind: "$Competency"
        },
        {
            $project: {
                Role: 1,
                E0: {
                    $cond: [{
                        $eq: ["$Competency.Level", "E0"]
                    }, 1, 0]
                },
                E1: {
                    $cond: [{
                        $eq: ["$Competency.Level", "E1"]
                    }, 1, 0]
                },
                E2: {
                    $cond: [{
                        $eq: ["$Competency.Level", "E2"]
                    }, 1, 0]
                }
            }
        },
        {
            $group: {
                _id: "$Role",
                E0: {
                    $sum: "$E0"
                },
                E1: {
                    $sum: "$E1"
                },
                E2: {
                    $sum: "$E2"
                }
            }
        }, {
            $project: {
                E0: {
                    $toString: "$E0"
                },
                E1: {
                    $toString: "$E1"
                },
                E2: {
                    $toString: "$E2"
                }
            }
        }

    ], function(err, result) {

        if (err) {
            res.send(err)
        } else {
            res.json(result)
        }

    })


});


//Adding data for Pie Chart
router.route("/Detail/DevE0").get(function(req, res) {
    m.aggregate([{
            $match: {
                $and: [{
                        'Competency.Level': 'E0'
                    },
                    {
                        'Role': 'Developer'
                    }
                ]
            }
        },
        {
            $unwind: '$Competency'
        },
        {
            $match: {
                'Competency.Level': 'E0'
            }
        },
        {
            $project: {
                '_id': 1,
                'Emp_Id': 1,
                'Emp_Name': 1,
                'Competency.Tech': 1
            }
        },
        {
            $group: {
                "_id": {
                    "Emp_Id": "$Emp_Id",
                    "Emp_Name": "$Emp_Name"
                },
                Competency: {
                    $push: "$Competency"
                }
            }
        }
        //{ $project: { '_id':1,'Emp_Id': 1,'Emp_Name': 1, 'Competency.Tech': 1}}

    ], function(err, result) {

        if (err) {
            res.send(err)
        } else {
            res.json(result)
        }

    })


});
router.route("/Detail/DevE1").get(function(req, res) {
    m.aggregate([{
            $match: {
                $and: [{
                        'Competency.Level': 'E1'
                    },
                    {
                        'Role': 'Developer'
                    }
                ]
            }
        },
        {
            $unwind: '$Competency'
        },
        {
            $match: {
                'Competency.Level': 'E1'
            }
        },
        {
            $project: {
                '_id': 1,
                'Emp_Id': 1,
                'Emp_Name': 1,
                'Competency.Tech': 1
            }
        },
        {
            $group: {
                "_id": {
                    "Emp_Id": "$Emp_Id",
                    "Emp_Name": "$Emp_Name"
                },
                Competency: {
                    $push: "$Competency"
                }
            }
        }
        //{ $project: { '_id':1,'Emp_Id': 1,'Emp_Name': 1, 'Competency.Tech': 1}}

    ], function(err, result) {

        if (err) {
            res.send(err)
        } else {
            res.json(result)
        }

    })


});
router.route("/Detail/DevE2").get(function(req, res) {
    m.aggregate([{
            $match: {
                $and: [{
                        'Competency.Level': 'E2'
                    },
                    {
                        'Role': 'Developer'
                    }
                ]
            }
        },
        {
            $unwind: '$Competency'
        },
        {
            $match: {
                'Competency.Level': 'E2'
            }
        },
        {
            $project: {
                '_id': 1,
                'Emp_Id': 1,
                'Emp_Name': 1,
                'Competency.Tech': 1
            }
        },
        {
            $group: {
                "_id": {
                    "Emp_Id": "$Emp_Id",
                    "Emp_Name": "$Emp_Name"
                },
                Competency: {
                    $push: "$Competency"
                }
            }
        }
        //{ $project: { '_id':1,'Emp_Id': 1,'Emp_Name': 1, 'Competency.Tech': 1}}

    ], function(err, result) {

        if (err) {
            res.send(err)
        } else {
            res.json(result)
        }

    })


});
router.route("/Detail/TechLeadE0").get(function(req, res) {
    m.aggregate([{
            $match: {
                $and: [{
                        'Competency.Level': 'E0'
                    },
                    {
                        'Role': 'TechLead'
                    }
                ]
            }
        },
        {
            $unwind: '$Competency'
        },
        {
            $match: {
                'Competency.Level': 'E0'
            }
        },
        {
            $project: {
                '_id': 1,
                'Emp_Id': 1,
                'Emp_Name': 1,
                'Competency.Tech': 1
            }
        },
        {
            $group: {
                "_id": {
                    "Emp_Id": "$Emp_Id",
                    "Emp_Name": "$Emp_Name"
                },
                Competency: {
                    $push: "$Competency"
                }
            }
        }
        //{ $project: { '_id':1,'Emp_Id': 1,'Emp_Name': 1, 'Competency.Tech': 1}}

    ], function(err, result) {

        if (err) {
            res.send(err)
        } else {
            res.json(result)
        }

    })


});
router.route("/Detail/TechLeadE1").get(function(req, res) {
    m.aggregate([{
            $match: {
                $and: [{
                        'Competency.Level': 'E1'
                    },
                    {
                        'Role': 'TechLead'
                    }
                ]
            }
        },
        {
            $unwind: '$Competency'
        },
        {
            $match: {
                'Competency.Level': 'E1'
            }
        },
        {
            $project: {
                '_id': 1,
                'Emp_Id': 1,
                'Emp_Name': 1,
                'Competency.Tech': 1
            }
        },
        {
            $group: {
                "_id": {
                    "Emp_Id": "$Emp_Id",
                    "Emp_Name": "$Emp_Name"
                },
                Competency: {
                    $push: "$Competency"
                }
            }
        }
        //{ $project: { '_id':1,'Emp_Id': 1,'Emp_Name': 1, 'Competency.Tech': 1}}

    ], function(err, result) {

        if (err) {
            res.send(err)
        } else {
            res.json(result)
        }

    })


});
router.route("/Detail/TechLeadE2").get(function(req, res) {
    m.aggregate([{
            $match: {
                $and: [{
                        'Competency.Level': 'E2'
                    },
                    {
                        'Role': 'TechLead'
                    }
                ]
            }
        },
        {
            $unwind: '$Competency'
        },
        {
            $match: {
                'Competency.Level': 'E2'
            }
        },
        {
            $project: {
                '_id': 1,
                'Emp_Id': 1,
                'Emp_Name': 1,
                'Competency.Tech': 1
            }
        },
        {
            $group: {
                "_id": {
                    "Emp_Id": "$Emp_Id",
                    "Emp_Name": "$Emp_Name"
                },
                Competency: {
                    $push: "$Competency"
                }
            }
        }
        //{ $project: { '_id':1,'Emp_Id': 1,'Emp_Name': 1, 'Competency.Tech': 1}}

    ], function(err, result) {

        if (err) {
            res.send(err)
        } else {
            res.json(result)
        }

    })


});


app.use('/', router);

app.listen(4000);
console.log("Listening to PORT 4000");
