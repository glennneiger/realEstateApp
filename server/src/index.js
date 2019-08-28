const { GraphQLServer } = require('graphql-yoga');
const fetch = require('node-fetch');
const API_KEY = require('../secrets');

const typeDefs = `
  type Query {
    getProperty: Property
  }
    type Property {
      status: Status
      property: [Info]
    }
    type Status {
      version: String
      code: Int
      msg: String
      total: Int
      page: Int
      pagesize: Int
      responseDateTime: String
      transactionID: String
    }
    type Info {
      address: Address
      summary: Summary
    }
    type Address {
      country: String
      countrySubd: String
      line1: String
      line2: String
      locality: String
      matchCode: String
      oneLine: String
      postal1: String
      postal2: String
      postal3: String
      stateFips: String
    }
    type Summary {
      absenteeInd: String
      propClass: String
      propSubType: String
      propType: String
      yearBuilt: Int
      propLandUse: String
      propIndicator: Int
      legal1: String
      quitClaimFlag: String
      REOflag: String
    }
  
`;

const headers = {
  accept: 'application/json',
  APIKey: API_KEY,
};

const resolvers = {
  Query: {
    getProperty: async _ => {
      const response = await fetch(
        `https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/expandedprofile?address1=224%20North%20Fremont%20Street&address2=Naperville%2C%20IL`,
        { method: 'GET', headers: headers }
      );
      return response.json();
    },
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log('Server is running on localhost:4000'));
