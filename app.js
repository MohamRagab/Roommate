const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const [users, registeration, updateUsers, deleteUsers, usersByKey] = require('./users');
const [members, membersByKey, insertMember, updateMember, deleteMembers] = require('./members');
const [membersTypes, membersTypesByKey, insertMembersTypes, updateMembersTypes, deleteMembersTypes] = require('./membersTypes');
const [membersGroups, membersGroupsByKey, insertMembersGroups, updateMembersGroups, deleteMembersGroups] = require('./membersGroups');
const [documentsTypes, documentsTypesByKey, insertDocumentsTypes, updateDocumentsTypes, deleteDocumentsTypes] = require('./documentsTypes');
const [universities, universitiesByKey, insertUniversities, updateUniversities, deleteUniversities] = require('./universities')
const [authenticateJWT, Token, login, logout] = require('./authentication');
const [cities, citiesByKey, insertCities, updateCities, deleteCities] = require('./cities')
const [preferencesLookups, preferencesLookupsByKey, insertPreferencesLookups, updatePreferencesLookups, deletePreferencesLookups] = require('./preferencesLookups')
const [documents, documentsByKey, insertDocuments, updateDocuments, deleteDocuments] = require('./documents')
const [faculties, facultiesByKey, insertfaculties, updatefaculties, deletefaculties] = require('./faculties')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: '*/*' }));
const router = express.Router();
router.use(function (request, response, next) {
  //   console.log("REQUEST:" + request.method + "   " + request.url);
  //   console.log("BODY:" + JSON.stringify(request.body));
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  response.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(bodyParser.json());
//users
router.route('/token').post(Token);
router.route('/logout').post(logout);
router.route('/users/').get(authenticateJWT, users);
router.route('/users/:Email').get(authenticateJWT, usersByKey);
router.route("/users/register").post(registeration);
router.route("/users/update").post(authenticateJWT, updateUsers);
router.route("/users/delete").delete(authenticateJWT, deleteUsers);
router.route("/login").post(login);
//members 
router.route('/members/').get(authenticateJWT, members);
router.route('/members/:MemberCodePk').get(authenticateJWT, membersByKey);
router.route("/members/insert").post(authenticateJWT, insertMember);
router.route("/members/update").post(authenticateJWT, updateMember);
router.route("/members/delete").delete(authenticateJWT, deleteMembers);
//membersTypes 
router.route('/membersTypes/').get(authenticateJWT, membersTypes);
router.route('/membersTypes/:MemberTypePk').get(authenticateJWT, membersTypesByKey);
router.route("/membersTypes/insert").post(authenticateJWT, insertMembersTypes);
router.route("/membersTypes/update").post(authenticateJWT, updateMembersTypes);
router.route("/membersTypes/delete").delete(authenticateJWT, deleteMembersTypes);

//membersGroups
router.route('/membersGroups/').get(authenticateJWT, membersGroups);
router.route('/membersGroups/:MemberGroupPk').get(authenticateJWT, membersGroupsByKey);
router.route("/membersGroups/insert").post(authenticateJWT, insertMembersGroups);
router.route("/membersGroups/update").post(authenticateJWT, updateMembersGroups);
router.route("/membersGroups/delete").delete(authenticateJWT, deleteMembersGroups);

//documentsTypes
router.route('/documentsTypes/').get(authenticateJWT, documentsTypes);
router.route('/documentsTypes/:DocTypeCodePk').get(authenticateJWT, documentsTypesByKey);
router.route("/documentsTypes/insert").post(authenticateJWT, insertDocumentsTypes);
router.route("/documentsTypes/update").post(authenticateJWT, updateDocumentsTypes);
router.route("/documentsTypes/delete").delete(authenticateJWT, deleteDocumentsTypes);
//universities
router.route('/universities/').get(authenticateJWT, universities);
router.route('/universities/:UniversityCodePk').get(authenticateJWT, universitiesByKey);
router.route("/universities/insert").post(authenticateJWT, insertUniversities);
router.route("/universities/update").post(authenticateJWT, updateUniversities);
router.route("/universities/delete").delete(authenticateJWT, deleteUniversities);
//cities
router.route('/cities/').get(authenticateJWT, cities);
router.route('/cities/:CityCodePk').get(authenticateJWT, citiesByKey);
router.route("/cities/insert").post(authenticateJWT, insertCities);
router.route("/cities/update").post(authenticateJWT, updateCities);
router.route("/cities/delete").delete(authenticateJWT, deleteCities);
//preferencesLookups
router.route('/preferencesLookups/').get(authenticateJWT, preferencesLookups);
router.route('/preferencesLookups/:PrefCodePk').get(authenticateJWT, preferencesLookupsByKey);
router.route("/preferencesLookups/insert").post(authenticateJWT, insertPreferencesLookups);
router.route("/preferencesLookups/update").post(authenticateJWT, updatePreferencesLookups);
router.route("/preferencesLookups/delete").delete(authenticateJWT, deletePreferencesLookups);

//documents
router.route('/documents/').get(authenticateJWT, documents);
router.route('/documents/:DocCodePk').get(authenticateJWT, documentsByKey);
router.route("/documents/insert").post(authenticateJWT, insertDocuments);
router.route("/documents/update").post(authenticateJWT, updateDocuments);
router.route("/documents/delete").delete(authenticateJWT, deleteDocuments);
//faculties
router.route('/faculties/').get(authenticateJWT, faculties);
router.route('/faculties/:FacultyCodePk').get(authenticateJWT, facultiesByKey);
router.route("/faculties/insert").post(authenticateJWT, insertfaculties);
router.route("/faculties/update").post(authenticateJWT, updatefaculties);
router.route("/faculties/delete").delete(authenticateJWT, deletefaculties);

app.use(express.static('static'));
app.use('/', router);
app.listen(7000, () => {
  console.log('all service started on port 7000');
});