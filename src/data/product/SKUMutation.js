require("babel-polyfill");

import {
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLList,
    GraphQLInt,
    GraphQLString
} from 'graphql'

import {
    connectionArgs,
    mutationWithClientMutationId,
    cursorForObjectInConnection,
    connectionFromPromisedArray,
    fromGlobalId
} from 'graphql-relay'


import {
    ViewerType,
    SKUType,
    SKUEdge
} from '../Model'

import {
    getViewer,
} from '../stores/UserStore';

import SKUService from './SkuService'

export const CreateSKUMutation = new mutationWithClientMutationId({
    name: 'CreateSKUMutation',
    description: 'Function to create a sku',
    inputFields: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        description: {type: GraphQLString},
        disabled: {type: GraphQLBoolean},
        startDate: {type: GraphQLString},
        endDate: {type: GraphQLString},
        visible: {type: GraphQLBoolean},
        price: {type: GraphQLFloat},
        currency: {type: GraphQLString},
        reference: {type: GraphQLString},
        threshold: {type: GraphQLInt},
        quantity: {type: GraphQLInt},
        available: {type: GraphQLBoolean}
    },
    outputFields: {
        viewer: {
            type: ViewerType,
            resolve: () => getViewer("me")
        },
        sku: {
            type: SKUType,
            resolve: (payload) => payload
        }
    },
    mutateAndGetPayload: async (args) => {
        delete args.clientMutationId;
        return await SKUService.createSKU(args)
    }
});

export const ModifySKUMutation = new mutationWithClientMutationId({
    name: 'ModifySKUMutation',
    description: 'Function to modify a sku',
    inputFields: {
        id: {type: new GraphQLNonNull(GraphQLString)},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        disabled: {type: GraphQLBoolean},
        startDate: {type: GraphQLString},
        endDate: {type: GraphQLString},
        visible: {type: GraphQLBoolean},
        price: {type: GraphQLFloat},
        currency: {type: GraphQLString},
        reference: {type: GraphQLString},
        threshold: {type: GraphQLInt},
        quantity: {type: GraphQLInt},
        available: {type: GraphQLBoolean}
    },
    outputFields: {
        viewer: {
            type: ViewerType,
            resolve: () => getViewer("me")
        },
        sku: {
            type: SKUType,
            resolve: (payload) => payload
        }
    },
    mutateAndGetPayload: async (args) => {
        args.id = fromGlobalId(args.id).id;
        delete args.clientMutationId;
        return await SKUService.modifySKU(args)
    }
});

export const DeleteSKUMutation = new mutationWithClientMutationId({
    name: 'DeleteSKUMutation',
    description: 'Function to delete a sku',
    inputFields: {
        id: {type: new GraphQLNonNull(GraphQLString)}
    },
    outputFields: {
        viewer: {
            type: ViewerType,
            resolve: () => getViewer("me")
        }
    },
    mutateAndGetPayload: async (args) => {
        let id = fromGlobalId(args.id).id;
        return await SKUService.deleteSKU(id)
    }
});

export const DeleteSKULocalizedContent = new mutationWithClientMutationId({
    name: 'DeleteSKULocalizedContent',
    description: 'Delete a localized content for a sku',
    inputFields: {
        skuId: {type: new GraphQLNonNull(GraphQLString)},
        locale: {type: new GraphQLNonNull(GraphQLString)}
    },
    outputFields: {
        viewer: {
            type: ViewerType,
            resolve: () => getViewer("me")
        }
    },
    mutateAndGetPayload: async (args) => {
        let skuId = fromGlobalId(args.skuId).id;
        return await SKUService.deleteSKULocalizedContent(skuId, args.locale)
    }
});

export const CreateSKULocalizedContent = new mutationWithClientMutationId({
    name: 'CreateSKULocalizedContent',
    description: 'create a localized content for a sku',
    inputFields: {
        skuId: {type: new GraphQLNonNull(GraphQLString)},
        locale: {type: new GraphQLNonNull(GraphQLString)},
        displayName: {type: GraphQLString},
        promotion: {type: GraphQLString},
        shortDescription: {type: GraphQLString},
        mediumDescription: {type: GraphQLString},
        longDescription: {type: GraphQLString}
    },
    outputFields: {
        viewer: {
            type: ViewerType,
            resolve: () => getViewer("me")
        },
        sku: {
            type: SKUType,
            resolve: (payload) => SKUService.findSKUById(payload.skuId)
        }
    },
    mutateAndGetPayload: async (args) => {
        let skuId = fromGlobalId(args.skuId).id;
        delete args.clientMutationId;
        delete args.skuId;
        let localizedContent = await SKUService.createSKULocalizedContent(skuId, args.locale, args);
        return {
            localizedContent: localizedContent,
            skuId: skuId
        }
    }
});

export const ModifySKULocalizedContent = new mutationWithClientMutationId({
    name: 'ModifySKULocalizedContent',
    description: 'modify a localized content for a sku',
    inputFields: {
        id: {type: new GraphQLNonNull(GraphQLString)},
        skuId: {type: new GraphQLNonNull(GraphQLString)},
        locale: {type: new GraphQLNonNull(GraphQLString)},
        displayName: {type: GraphQLString},
        promotion: {type: GraphQLString},
        shortDescription: {type: GraphQLString},
        mediumDescription: {type: GraphQLString},
        longDescription: {type: GraphQLString}
    },
    outputFields: {
        viewer: {
            type: ViewerType,
            resolve: () => getViewer("me")
        },
        skuEdge: {
            type: SKUEdge,
            resolve: async (payload) => {

                let skus = await SKUService.findAllSKUs();
                let sku = await SKUService.findSKUById(payload.skuId);
                let cursor = cursorForObjectInConnection(skus, sku);
                return {
                    cursor: cursor,
                    node: sku
                }
            }
        }
    },
    mutateAndGetPayload: async (args) => {
        let skuId = fromGlobalId(args.skuId).id;
        args.id = fromGlobalId(args.id).id;
        delete args.clientMutationId;
        delete args.skuId;
        let localizedContent = await SKUService.modifySKULocalizedContent(skuId, args.locale, args);
        return {
            localizedContent: localizedContent,
            skuId: skuId
        }
    }
});