'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Schema = undefined;

var _graphql = require('graphql');

var _Model = require('./Model');

var _CatalogMutation = require('./catalog/CatalogMutation');

var Mutation = new _graphql.GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createCatalog: _CatalogMutation.CreateCatalogMutation,
    modifyCatalog: _CatalogMutation.ModifyCatalogMutation,
    deleteCatalog: _CatalogMutation.DeleteCatalogMutation,
    createCatalogLocalizedContent: _CatalogMutation.CreateCatalogLocalizedContentMutation
  }
});

var Schema = exports.Schema = new _graphql.GraphQLSchema({
  query: _Model.GraphQLRoot,
  mutation: Mutation
});