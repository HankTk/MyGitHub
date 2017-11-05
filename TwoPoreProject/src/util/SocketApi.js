/**
 * SocketApi
 *
 */
import {
    receiveDataSuccessProject,
    receiveDataSuccessPage,
    pageDetailSelected
} from '../redux/actions'

let websocket;

/**
 * SocketApi
 *
 */
export default class SocketApi {

    /**
     * openWebSocket
     *
     */
    static openWebSocket(store)
    {
        this.store = store;

        let self = this;
        let webSocketURL = 'wss://wiki-meta-explorer.herokuapp.com/';
        websocket = new WebSocket(webSocketURL);
        websocket.onopen = function(evt) { self.onOpen(evt) };
        websocket.onclose = function(evt) { self.onClose(evt) };
        websocket.onmessage = function(evt) { self.onMessage(evt) };
        websocket.onerror = function(evt) { self.onError(evt) };
    }

    /**
     * closeWebSocket
     */
    static closeWebSocket()
    {
        websocket.close();
    }

    /**
     * onOpen
     *
     * @param evt
     */
    static onOpen(evt)
    {
        console.log('CONNECTED: ', evt.data);
        if (this.store.getState().twopore.projectArray.length === 0) {
            this.getProject();
        }
    }

    /**
     * onClose
     *
     * @param evt
     */
    static onClose(evt)
    {
        console.log('DISCONNECTED: ', evt.data);

        // Open WebSocket
        this.openWebSocket(this.store);
    }

    /**
     * onMessage
     *
     * @param evt
     */
    static onMessage(evt)
    {
        let jsonObject = JSON.parse(evt.data);
        let resultName = jsonObject.name;
        let resultData = jsonObject.data;
        let index = 0;

        // When project.list
        if (resultName === 'project.list') {
            let projectList = resultData.map((data) => {
                return {
                    id: index++,
                    name: data
                };
            });
            this.store.dispatch(receiveDataSuccessProject(projectList));
        }

        // When page.subscribe
        if (resultName === 'project.subscribe') {
            let pageList = resultData.map((data) => {
                return data;
            });
            this.store.dispatch(receiveDataSuccessPage(pageList));
        }

        // When page.list
        if (resultName === 'page.list') {
            let pageList = resultData.map((data) => {
                return data;
            });
            this.store.dispatch(receiveDataSuccessPage(pageList));
        }

        // When page.subscribe
        if (resultName === 'page.subscribe') {
            let pageData = resultData.map((data) => {
                return data;
            });
            this.store.dispatch(pageDetailSelected(pageData));
        }
    }

    /**
     * onError
     *
     * @param evt
     */
    static onError(evt)
    {
        console.log('ERROR: ', evt.data);
    }

    /**
     * doSend
     *
     * @param command
     */
    static doSend(command)
    {
        console.log('SENT: ', command);
        websocket.send(JSON.stringify(command));
    }

    /**
     * getProject
     *
     * {
     *    "id": <ANY_UNIQUE_ID>,
     *    "name": <NAME_OF_THE_COMMAND>,
     *    "args": { // OPTIONAL PROPERTY
     *      <KEY>: <VALUE>
     *    }
     *  }
     */
    static getProject()
    {
        console.log('getProject: project.list');
        let currentTime = (new Date()).getTime();
        this.doSend({
            "id": currentTime,
            "name": "project.list"
        });
    }

    /**
     * getProjectPages
     *
     * {
     *    "id": <ANY_UNIQUE_ID>,
     *    "name": <NAME_OF_THE_COMMAND>,
     *    "args": { // OPTIONAL PROPERTY
     *      "project": <The name of the project>
     *    }
     *  }
     */
    static getProjectPages(selectedItem)
    {
        console.log('getProjectPages: ' + selectedItem.name);
        let currentTime = (new Date()).getTime();
        this.doSend({
            "id": currentTime,
            "name": "page.list",
            "args": {
                "project": selectedItem.name
            }
        });
    }

    /**
     * subscribeProject
     *
     * {
     *    "id": <ANY_UNIQUE_ID>,
     *    "name": <NAME_OF_THE_COMMAND>,
     *    "args": { // OPTIONAL PROPERTY
     *      "project": <The name of the project>
     *    }
     *  }
     */
    static subscribeProject(selectedItem)
    {
        console.log('subscribeProject: ' + selectedItem.name);
        let currentTime = (new Date()).getTime();
        this.doSend({
            "id": currentTime,
            "name": "project.subscribe",
            "args": {
                "project": selectedItem.name
            }
        });
    }

    /**
     * unsubscribeProject
     *
     * {
     *    "id": <ANY_UNIQUE_ID>,
     *    "name": <NAME_OF_THE_COMMAND>
     *  }
     */
    static unsubscribeProject()
    {
        console.log('unsubscribeProject: ');
        let currentTime = (new Date()).getTime();
        this.doSend({
            "id": currentTime,
            "name": "project.unsubscribe"
        });
    }

    /**
     * subscribePage
     *
     * {
     *    "id": <ANY_UNIQUE_ID>,
     *    "name": <NAME_OF_THE_COMMAND>,
     *    "args": { // OPTIONAL PROPERTY
     *      "pageId": <The id of the page>
     *    }
     *  }
     */
    static subscribePage(selectedItem)
    {
        console.log('subscribePage: ' + selectedItem.pageid);
        let currentTime = (new Date()).getTime();
        this.doSend({
            "id": currentTime,
            "name": "page.subscribe",
            "args": {
                "pageId": selectedItem.pageid
            }
        });
    }

    /**
     * unsubscribePage
     *
     * {
     *    "id": <ANY_UNIQUE_ID>,
     *    "name": <NAME_OF_THE_COMMAND>
     *  }
     */
    static unsubscribePage()
    {
        console.log('unsubscribePage: ');
        let currentTime = (new Date()).getTime();
        this.doSend({
            "id": currentTime,
            "name": "page.unsubscribe"
        });
    }

}

