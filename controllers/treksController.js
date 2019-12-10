import { setHeaderInfo, getTemplate } from "../helpers/storage.js";
import { post, get, del, put } from "../helpers/requester.js";

export function getCreate(ctx) {
    setHeaderInfo(ctx);
    getTemplate(ctx, './views/treks/create.hbs');
}

export function postCreate(ctx) {
    const { location, dateTime, description, imageURL } = ctx.params;

    if(location && dateTime && description && imageURL) {
        post('appdata', 'treks', { 
            location, 
            dateTime,
            description, 
            imageURL,
            likesCounter: 0,
            organizer: sessionStorage.getItem('username')
        }).then(() => {
            ctx.redirect('/');
        }).catch(console.error);
    }
}

export function getDetail(ctx) {
    const id = ctx.params.id;
    setHeaderInfo(ctx);
    get('appdata', `treks/${id}`, 'Kinvey')
        .then((treks) => {
            treks.isCreator = sessionStorage.getItem('userId') === treks._acl.creator;
            ctx.treks = treks;
            getTemplate(ctx, '../views/treks/details.hbs');
        })
        .catch(console.error)
}

export function getEdit(ctx) {
    const id = ctx.params.id;
    setHeaderInfo(ctx);
    get('appdata', `treks/${id}`, 'Kinvey')
        .then((treks) => {
            ctx.treks = treks;
            
            getTemplate(ctx, '../views/treks/edit.hbs');
        })
}

export function postEdit(ctx) {
    const { location, dateTime, description, imageURL, likesCounter } = ctx.params;
    const id = ctx.params.id;

    put('appdata', `treks/${id}`, {
        location, 
        dateTime, 
        description, 
        imageURL,
        likesCounter: Number(likesCounter),
        organizer: sessionStorage.getItem('username')
    }, 'Kinvey').then(() => {
        ctx.redirect('/');
    }).catch(console.error)
}

export function postLike(ctx) {
    const id = ctx.params.id;
    setHeaderInfo(ctx);

    get('appdata', `treks/${id}`, 'Kinvey')
        .then((treks) => {
            treks.likesCounter++;
            return put('appdata', `treks/${id}`, treks, 'Kinvey')
        })
        .then(() => {
            ctx.redirect(`/treks/${id}`);
        });
}

export function deleteTrek(ctx) {
    const id = ctx.params.id;
    setHeaderInfo(ctx);

    del('appdata', `treks/${id}`, 'Kinvey')
        .then(() => {
            ctx.redirect('/');
        })
        .catch(console.error)
}