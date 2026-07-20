// Generated from openapi.json by generate-openapi-runtime.ts. Do not edit directly.
export const openApiDocument = {
	"openapi": "3.1.0",
	"info": {
		"title": "Restock API",
		"version": "0.0.1"
	},
	"components": {
		"schemas": {
			"ShoppingItem": {
				"type": "object",
				"properties": {
					"id": {
						"type": "string",
						"example": "507f1f77bcf86cd799439011"
					},
					"name": {
						"type": "string",
						"example": "Butter"
					},
					"bought": {
						"type": "boolean",
						"example": false
					},
					"createdAt": {
						"type": "string",
						"format": "date-time",
						"example": "2026-07-20T12:00:00.000Z"
					}
				},
				"required": [
					"id",
					"name",
					"bought",
					"createdAt"
				]
			},
			"CreateShoppingItemRequest": {
				"type": "object",
				"properties": {
					"name": {
						"type": "string",
						"minLength": 1,
						"example": "Butter"
					}
				},
				"required": [
					"name"
				]
			},
			"UpdateShoppingItemRequest": {
				"type": "object",
				"properties": {
					"bought": {
						"type": "boolean",
						"example": true
					}
				},
				"required": [
					"bought"
				]
			},
			"ErrorResponse": {
				"type": "object",
				"properties": {
					"type": {
						"type": "string",
						"example": "about:blank"
					},
					"title": {
						"type": "string",
						"example": "Bad Request"
					},
					"status": {
						"type": "integer",
						"example": 400
					},
					"detail": {
						"type": "string",
						"example": "The request could not be validated"
					},
					"instance": {
						"type": "string",
						"example": "/v1/health"
					},
					"code": {
						"type": "string",
						"example": "#ERR_VALIDATION_FAILED"
					},
					"errors": {
						"type": "array",
						"items": {
							"$ref": "#/components/schemas/ErrorDetail"
						}
					}
				},
				"required": [
					"type",
					"title",
					"status",
					"detail",
					"instance",
					"code"
				]
			},
			"ErrorDetail": {
				"type": "object",
				"properties": {
					"source": {
						"type": "string",
						"enum": [
							"body",
							"path",
							"query",
							"header",
							"cookie"
						],
						"example": "query"
					},
					"path": {
						"type": "array",
						"items": {
							"anyOf": [
								{
									"type": "string"
								},
								{
									"type": "number"
								}
							]
						},
						"example": [
							"name"
						]
					},
					"detail": {
						"type": "string",
						"example": "String must contain at least 1 character"
					}
				},
				"required": [
					"source",
					"path",
					"detail"
				]
			},
			"HealthResponse": {
				"type": "object",
				"properties": {
					"status": {
						"type": "string",
						"enum": [
							"ok"
						],
						"example": "ok"
					},
					"version": {
						"type": "string",
						"example": "0.0.1d"
					}
				},
				"required": [
					"status",
					"version"
				]
			}
		}
	},
	"paths": {
		"/items": {
			"get": {
				"tags": [
					"items"
				],
				"summary": "List shopping items",
				"operationId": "listItems",
				"responses": {
					"200": {
						"description": "The shopping items",
						"content": {
							"application/json": {
								"schema": {
									"type": "array",
									"items": {
										"$ref": "#/components/schemas/ShoppingItem"
									}
								}
							}
						}
					},
					"500": {
						"description": "The shopping items could not be retrieved",
						"content": {
							"application/problem+json": {
								"schema": {
									"$ref": "#/components/schemas/ErrorResponse"
								}
							}
						}
					}
				}
			},
			"post": {
				"tags": [
					"items"
				],
				"summary": "Create a shopping item",
				"operationId": "createItem",
				"requestBody": {
					"required": true,
					"content": {
						"application/json": {
							"schema": {
								"$ref": "#/components/schemas/CreateShoppingItemRequest"
							}
						}
					}
				},
				"responses": {
					"201": {
						"description": "The shopping item was created",
						"content": {
							"application/json": {
								"schema": {
									"$ref": "#/components/schemas/ShoppingItem"
								}
							}
						}
					},
					"400": {
						"description": "The request is invalid",
						"content": {
							"application/problem+json": {
								"schema": {
									"$ref": "#/components/schemas/ErrorResponse"
								}
							}
						}
					},
					"500": {
						"description": "The shopping item could not be created",
						"content": {
							"application/problem+json": {
								"schema": {
									"$ref": "#/components/schemas/ErrorResponse"
								}
							}
						}
					}
				}
			}
		},
		"/items/{id}": {
			"parameters": [
				{
					"name": "id",
					"in": "path",
					"required": true,
					"description": "The shopping item's MongoDB ObjectId",
					"schema": {
						"type": "string",
						"pattern": "^[0-9a-fA-F]{24}$"
					}
				}
			],
			"put": {
				"tags": [
					"items"
				],
				"summary": "Update a shopping item's bought status",
				"operationId": "updateItem",
				"requestBody": {
					"required": true,
					"content": {
						"application/json": {
							"schema": {
								"$ref": "#/components/schemas/UpdateShoppingItemRequest"
							}
						}
					}
				},
				"responses": {
					"200": {
						"description": "The shopping item was updated",
						"content": {
							"application/json": {
								"schema": {
									"$ref": "#/components/schemas/ShoppingItem"
								}
							}
						}
					},
					"400": {
						"description": "The request is invalid",
						"content": {
							"application/problem+json": {
								"schema": {
									"$ref": "#/components/schemas/ErrorResponse"
								}
							}
						}
					},
					"404": {
						"description": "The shopping item was not found",
						"content": {
							"application/problem+json": {
								"schema": {
									"$ref": "#/components/schemas/ErrorResponse"
								}
							}
						}
					},
					"500": {
						"description": "The shopping item could not be updated",
						"content": {
							"application/problem+json": {
								"schema": {
									"$ref": "#/components/schemas/ErrorResponse"
								}
							}
						}
					}
				}
			},
			"delete": {
				"tags": [
					"items"
				],
				"summary": "Delete a shopping item",
				"operationId": "deleteItem",
				"responses": {
					"204": {
						"description": "The shopping item was deleted"
					},
					"400": {
						"description": "The shopping item id is invalid",
						"content": {
							"application/problem+json": {
								"schema": {
									"$ref": "#/components/schemas/ErrorResponse"
								}
							}
						}
					},
					"404": {
						"description": "The shopping item was not found",
						"content": {
							"application/problem+json": {
								"schema": {
									"$ref": "#/components/schemas/ErrorResponse"
								}
							}
						}
					},
					"500": {
						"description": "The shopping item could not be deleted",
						"content": {
							"application/problem+json": {
								"schema": {
									"$ref": "#/components/schemas/ErrorResponse"
								}
							}
						}
					}
				}
			}
		},
		"/v1/health": {
			"get": {
				"tags": [
					"health"
				],
				"summary": "Check API health",
				"operationId": "checkHealth",
				"responses": {
					"200": {
						"description": "The API is healthy",
						"content": {
							"application/json": {
								"schema": {
									"$ref": "#/components/schemas/HealthResponse"
								}
							}
						}
					},
					"500": {
						"description": "The API could not complete the health check",
						"content": {
							"application/problem+json": {
								"schema": {
									"$ref": "#/components/schemas/ErrorResponse"
								}
							}
						}
					}
				}
			}
		}
	},
	"webhooks": {}
} as const;
