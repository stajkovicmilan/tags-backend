(function () {

    var config = {
        authentification: '/v1/token',
        conversations: '/v1/organizations/{{organizationId}}/conversations',
        users: '/v1/organizations/{{organizationId}}/users',
        conversationUsers: '/v1/conversations/{{conversationId}}/users',
        messages: '/v1/conversations/{{conversationId}}/messages'
    };

    function ChatApiClient(protocol, host, organizationKey, organizationId) {

        var that = this;

        that.__protocol = protocol;
        that.__host = host;
        that.__organizationKey = organizationKey;
        that.__organizationId = organizationId;
        that.__token = null;
        that.__pollingCallbacks = {};

        that.authenticate = authenticate;
        that.getConversations = getConversations;
        that.createConversation = createConversation;
        that.updateConversation = updateConversation;
        that.deleteConversation = deleteConversation;
        that.getConversation = getConversation;

        that.getUsers = getUsers;
        that.createUser = createUser;
        that.updateUser = updateUser;
        that.getUser = getUser;
        that.deleteUser = deleteUser;

        that.addUserToConversation = addUserToConversation;
        that.removeUserFromConversation = removeUserFromConversation;

        that.sendMessage = sendMessage;
        that.onMessage = onMessage;
        that.getMessages = getMessages;

        ////////////////////////////////////////////////////////////////////

        function authenticate(username, password) {
            var apiClient = sendXHR;

            if (detectNode()) {
                apiClient = sendHTTP;
            }

            return apiClient(config.authentification, 'POST', {
                username: username,
                password: password
            }, that.__token, that.__organizationKey)
                .then(function (response) {
                    that.__token = response.token;
                    return {
                        status: 'OK',
                        message: 'Authentification succeeded'
                    };
                })
                .catch(function (error) {
                    return {
                        status: 'ERROR',
                        message: error
                    };
                });
        }

        function getConversations() {
            var apiClient = sendXHR;

            if (detectNode()) {
                apiClient = sendHTTP;
            }
            var url = config.conversations.replace('{{organizationId}}', that.__organizationId);
            return apiClient(url, 'GET', null, that.__token, that.__organizationKey)
                .then(function (response) {
                    return {
                        status: 'OK',
                        message: response
                    };
                })
                .catch(function (error) {
                    return {
                        status: 'ERROR',
                        message: error
                    };
                });
        }

        function createConversation(name, type, image) {
            var apiClient = sendXHR;

            if (detectNode()) {
                apiClient = sendHTTP;
            }
            var url = config.conversations.replace('{{organizationId}}', that.__organizationId);
            return apiClient(url, 'POST', {
                name: name,
                type: type,
                image: image
            }, that.__token, that.__organizationKey)
                .then(function (response) {
                    return {
                        status: 'OK',
                        message: response
                    };
                })
                .catch(function (error) {
                    return {
                        status: 'ERROR',
                        message: error
                    };
                });
        }

        function updateConversation(id, name, image) {
            var apiClient = sendXHR;

            if (detectNode()) {
                apiClient = sendHTTP;
            }
            var url = config.conversations.replace('{{organizationId}}', that.__organizationId) + '/' + id;
            return apiClient(url, 'PUT', {
                name: name,
                image: image
            }, that.__token, that.__organizationKey)
                .then(function (response) {
                    return {
                        status: 'OK',
                        message: response
                    };
                })
                .catch(function (error) {
                    return {
                        status: 'ERROR',
                        message: error
                    };
                });
        }

        function deleteConversation(id) {
            var apiClient = sendXHR;

            if (detectNode()) {
                apiClient = sendHTTP;
            }
            var url = config.conversations.replace('{{organizationId}}', that.__organizationId) + '/' + id;
            return apiClient(url, 'DELETE', null, that.__token, that.__organizationKey)
                .then(function (response) {
                    return {
                        status: 'OK',
                        message: response
                    };
                })
                .catch(function (error) {
                    return {
                        status: 'ERROR',
                        message: error
                    };
                });
        }

        function getConversation(id) {
            var apiClient = sendXHR;

            if (detectNode()) {
                apiClient = sendHTTP;
            }
            var url = config.conversations.replace('{{organizationId}}', that.__organizationId) + '/' + id;
            return apiClient(url, 'GET', null, that.__token, that.__organizationKey)
                .then(function (response) {
                    return {
                        status: 'OK',
                        message: response
                    };
                })
                .catch(function (error) {
                    return {
                        status: 'ERROR',
                        message: error
                    };
                });
        }

        function getUsers() {
            var apiClient = sendXHR;

            if (detectNode()) {
                apiClient = sendHTTP;
            }
            var url = config.users.replace('{{organizationId}}', that.__organizationId);
            return apiClient(url, 'GET', null, that.__token, that.__organizationKey)
                .then(function (response) {
                    return {
                        status: 'OK',
                        message: response
                    };
                })
                .catch(function (error) {
                    return {
                        status: 'ERROR',
                        message: error
                    };
                });
        }

        function createUser(firstName, lastName, nickname, image) {
            var apiClient = sendXHR;

            if (detectNode()) {
                apiClient = sendHTTP;
            }
            var url = config.users.replace('{{organizationId}}', that.__organizationId);
            return apiClient(url, 'POST', {
                firstName: firstName,
                lastName: lastName,
                nickname: nickname,
                image: image
            }, that.__token, that.__organizationKey)
                .then(function (response) {
                    return {
                        status: 'OK',
                        message: response
                    };
                })
                .catch(function (error) {
                    return {
                        status: 'ERROR',
                        message: error
                    };
                });
        }

        function updateUser(id, firstName, lastName, nickname, image) {
            var apiClient = sendXHR;

            if (detectNode()) {
                apiClient = sendHTTP;
            }
            var url = config.users.replace('{{organizationId}}', that.__organizationId) + '/' + id;
            return apiClient(url, 'PUT', {
                firstName: firstName,
                lastName: lastName,
                nickname: nickname,
                image: image
            }, that.__token, that.__organizationKey)
                .then(function (response) {
                    return {
                        status: 'OK',
                        message: response
                    };
                })
                .catch(function (error) {
                    return {
                        status: 'ERROR',
                        message: error
                    };
                });
        }

        function getUser(id) {
            var apiClient = sendXHR;

            if (detectNode()) {
                apiClient = sendHTTP;
            }
            var url = config.users.replace('{{organizationId}}', that.__organizationId) + '/' + id;
            return apiClient(url, 'GET', null, that.__token, that.__organizationKey)
                .then(function (response) {
                    return {
                        status: 'OK',
                        message: response
                    };
                })
                .catch(function (error) {
                    return {
                        status: 'ERROR',
                        message: error
                    };
                });
        }

        function deleteUser(id) {
            var apiClient = sendXHR;

            if (detectNode()) {
                apiClient = sendHTTP;
            }
            var url = config.users.replace('{{organizationId}}', that.__organizationId) + '/' + id;
            return apiClient(url, 'DELETE', null, that.__token, that.__organizationKey)
                .then(function (response) {
                    return {
                        status: 'OK',
                        message: response
                    };
                })
                .catch(function (error) {
                    return {
                        status: 'ERROR',
                        message: error
                    };
                });
        }

        function addUserToConversation(userId, conversationId) {
            var apiClient = sendXHR;

            if (detectNode()) {
                apiClient = sendHTTP;
            }
            var url = config.conversationUsers.replace('{{conversationId}}', conversationId);
            return apiClient(url, 'POST', {
                userId: userId
            }, that.__token, that.__organizationKey)
                .then(function (response) {
                    return {
                        status: 'OK',
                        message: response
                    };
                })
                .catch(function (error) {
                    return {
                        status: 'ERROR',
                        message: error
                    };
                });
        }

        function removeUserFromConversation(userId, conversationId) {
            var apiClient = sendXHR;

            if (detectNode()) {
                apiClient = sendHTTP;
            }
            var url = config.conversationUsers.replace('{{conversationId}}', conversationId) + '/' + userId;
            return apiClient(url, 'DELETE', null, that.__token, that.__organizationKey)
                .then(function (response) {
                    return {
                        status: 'OK',
                        message: response
                    };
                })
                .catch(function (error) {
                    return {
                        status: 'ERROR',
                        message: error
                    };
                });
        }

        function sendMessage(userId, conversationId, text) {
            var apiClient = sendXHR;

            if (detectNode()) {
                apiClient = sendHTTP;
            }
            var url = config.messages.replace('{{conversationId}}', conversationId);
            return apiClient(url, 'POST', {
                fromId: userId,
                content: text
            }, that.__token, that.__organizationKey)
                .then(function (response) {
                    return {
                        status: 'OK',
                        message: response
                    };
                })
                .catch(function (error) {
                    return {
                        status: 'ERROR',
                        message: error
                    };
                });
        }

        function getMessages(userId, conversationId) {
            var apiClient = sendXHR;

            if (detectNode()) {
                apiClient = sendHTTP;
            }
            var url = config.messages.replace('{{conversationId}}', conversationId);
            return apiClient(url, 'GET', null, that.__token, that.__organizationKey)
                .then(function (response) {
                    return {
                        status: 'OK',
                        message: response
                    };
                })
                .catch(function (error) {
                    return {
                        status: 'ERROR',
                        message: error
                    };
                });
        }

        function onMessage(userId, conversationId, callback) {
            if (detectNode()) {
                return onMessagePolling(userId, conversationId, callback);
            } else {
                return onMesageSocket(userId, conversationId, callback);
            }
        }

        function onMessagePolling(userId, conversationId, callback) {
            that.__pollingCallbacks[conversationId] = {};
            that.__pollingCallbacks[conversationId].messages = 0;
            that.__pollingCallbacks[conversationId].callback = callback;
            getMessages(userId, conversationId)
                .then(function (response) {
                    if (response.message.length) {
                        var convId = response.message[0].conversationId;
                        that.__pollingCallbacks[convId].messages = response.message.length;
                    }
                });
            setInterval(function () {
                getMessages(userId, conversationId)
                    .then(function (response) {
                        if (response.message.length) {
                            var pollingConfig = that.__pollingCallbacks[response.message[0].conversationId];
                            if (pollingConfig && pollingConfig.messages < response.message.length) {
                                var numberOfNew = response.message.length - pollingConfig.messages;
                                pollingConfig.messages += numberOfNew;
                                pollingConfig.callback(response.message.slice(response.message.length - numberOfNew));
                            }
                        }
                    });
            }, 2000);
        }

        function onMesageSocket(userId, conversationId, callback) {

        }

        function sendXHR(url, method, data, token, orgKey) {

            return new Promise(function (resolve, reject) {
                var postData = data ? JSON.stringify(data) : '';

                var oReq = new XMLHttpRequest();
                oReq.addEventListener('load', function (response) {
                    if (response.target.status === 200 || response.target.status === 201) {
                        resolve(JSON.parse(response.target.response));
                    } else if (response.target.status === 204) {
                        resolve('NO_CONTENT');
                    } else {
                        reject(response.target.statusText + ' - ' + response.target.response);
                    }
                });
                oReq.addEventListener("error", function (err) {
                    reject(err);
                });
                oReq.open(method, that.__protocol + '://' + that.__host + url);
                oReq.setRequestHeader('Content-Type', 'application/json');
                oReq.setRequestHeader('Authorization', 'API ' + token);
                oReq.setRequestHeader('c_api_key', orgKey);
                oReq.send(postData);
            });
        }

        function sendHTTP(url, method, data, token, orgKey) {

            return new Promise(function (resolve, reject) {
                var postData = data ? JSON.stringify(data) : '';

                var options = {
                    hostname: that.__host,
                    port: that.__protocol === 'https' ? 443 : 80,
                    path: url,
                    method: method,
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': Buffer.byteLength(postData),
                        'Authorization': 'API ' + token,
                        'c_api_key': orgKey
                    }
                };

                var https = require(that.__protocol);

                // console.log('Invoking API');
                // console.log(options);

                console.log(`REQUEST: ${that.__protocol} =>`, options);
                console.log(data);

                var req = https.request(options, function (res) {
                    // console.log(`HTTP STATUS: ${res.statusCode}`);
                    // console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
                    res.setEncoding('utf8');
                    var response = '';
                    res.on('data', (chunk) => {
                        response += chunk;
                    });
                    res.on('end', () => {
                        console.log('RESPONSE: ' + response);
                        if (res.statusCode === 200 || res.statusCode === 201) {
                            resolve(JSON.parse(response));
                        } else if (res.statusCode === 204) {
                            resolve('NO_CONTENT');
                        } else {
                            reject(response);
                        }
                    });
                });

                req.on('error', (e) => {
                    // console.error(`ERROR: ${e.message}`);
                    reject(e);
                });

                // write data to request body
                req.write(postData);
                req.end();
            });
        }
    }

    function detectNode() {
        return (typeof module !== 'undefined' && module.exports);
    }

    if (detectNode()) {
        module.exports = {
            ChatApiClient: ChatApiClient
        };
    } else {
        window.ChatApiClient = ChatApiClient;
    }
}());
