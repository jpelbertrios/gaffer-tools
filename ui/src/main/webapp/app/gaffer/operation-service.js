

'use strict'

angular.module('app').factory('operationService', ['$http', 'settings', 'config', 'query', 'types', function($http, settings, config, query, types) {

    var operationService = {}

    var opWhiteList = undefined; // TODO should probably be populated by GET graph/config/operations
    var opBlackList = [];        // TODO should probably be populated by the config service
    operationService.availableOperations = []
    var namedOpClass = "uk.gov.gchq.gaffer.named.operation.NamedOperation"



    var opAllowed = function(opName) {
//            var allowed = true;
//            if(settings.whiteList) {
//                allowed = settings.whiteList.indexOf(opName) > -1;
//            }
//            if(allowed && settings.blackList) {
//                allowed = settings.backList.indexOf(opName) == -1;
//            }
//            return allowed;
        return true
    }

    var updateNamedOperations = function(results) {
        operationService.availableOperations = [];
        var defaults = config.getConfig().operations.defaultAvailable
        for(var i in defaults) {
            if(opAllowed(defaults[i].name)) {
                operationService.availableOperations.push(defaults[i])
            }
        }

        if(results) {
            for (var i in results) {
                if(opAllowed(results[i].operationName)) {
                    if(results[i].parameters) {
                        for(j in results[i].parameters) {
                            results[i].parameters[j].value = results[i].parameters[j].defaultValue;
                            if(results[i].parameters[j].defaultValue) {
                                var valueClass = results[i].parameters[j].valueClass;
                                results[i].parameters[j].parts = types.getType(valueClass).createParts(valueClass, results[i].parameters[j].defaultValue);
                            } else {
                                results[i].parameters[j].parts = {};
                            }
                        }
                    }
                    operationService.availableOperations.push({
                        class: namedOpClass,
                        name: results[i].operationName,
                        parameters: results[i].parameters,
                        description: results[i].description,
                        operations: results[i].operations,
                        view: false,
                        input: true,
                        namedOp: true,
                        inOutFlag: false
                    });
                }
            }
        }
    }

    operationService.reloadNamedOperations = function(url) {
        query.execute(
            url,
            JSON.stringify(
            {
                class: "uk.gov.gchq.gaffer.named.operation.GetAllNamedOperations"
            }), updateNamedOperations)
    }


    operationService.createLimitOperation = function() {
        return {
            class: "uk.gov.gchq.gaffer.operation.impl.Limit",
            resultLimit: settings.getResultLimit()
        }
    }

    operationService.createDeduplicateOperation = function() {
        return {
            class: "uk.gov.gchq.gaffer.operation.impl.output.ToSet",
        };
    }

    return operationService

}])
