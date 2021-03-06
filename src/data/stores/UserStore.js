export class Viewer extends Object {}

const VIEWER_ID = 'me';

var viewer = new Viewer();
viewer.id = VIEWER_ID;
viewer.locale = 'fr_FR';


var users = {};
users[VIEWER_ID] = viewer;

const usersById = {
    [VIEWER_ID]: viewer
};

export function registerViewer(viewer) {

    if(users[viewer.id] == undefined) {
        users[viewer.id] = viewer
    }
}

export function getViewerLocale(viewerId) {
    return users[viewerId].locale
}

export function getViewer(viewerId) {
    return users[viewerId]
}
