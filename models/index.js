const User = require("./user");
const Client = require("./client");
const BTAssessments = require("./bt-assessments");
const STAssessments = require("./st-assessments");
const OTAssessments = require("./ot-assessments");

module.exports = {
    User: User.User,
    Client: Client.Client,
    BTAssessments: BTAssessments.BTAssessments,
    STAssessments: STAssessments.STAssessments,
    OTAssessments: OTAssessments.OTAssessments
}